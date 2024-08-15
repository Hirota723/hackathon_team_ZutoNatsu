"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/api/getUser";
import { getUserId } from "@/api/getUserId";
import { addPhoto } from "./api/addPhoto";
import { getPhotoUrl, uploadPhoto } from "./api/photoStorage";
import { fetchAddress, formatAddress } from "./api/LocationService";
import Photos from "@/entities/photos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PhotoPostPresenter from "./PhotoPostPresenter";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { formSchema } from "@/utils/formSchema";

const PhotoPostContainer = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");

  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();

      if (user) {
        setUserName(user.user_metadata.name);
        setUserAvatarUrl(user.user_metadata.picture);
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      title: "",
      location: "",
    },
  });

  const handleGetCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // 逆ジオコーディングで住所を取得
          const address = await fetchAddress(latitude, longitude);

          if (address) {
            // フィールドに住所をセット
            const formattedAddress = formatAddress(address);
            form.setValue("location", formattedAddress);
          }
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error);

          toast({
            title: "エラー",
            description:
              "位置情報の取得に失敗しました。位置情報の利用を許可してください。",
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("このブラウザでは位置情報が取得できません。");

      toast({
        title: "エラー",
        description: "このブラウザでは位置情報が取得できません。",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const { title5, title7, title5_2, location, image } = value;

    // 5-7-5形式のタイトルを結合
    const title = `${title5}\n${title7}\n${title5_2}`;

    const filePath = `photos/${uuidv4()}`;

    try {
      await uploadPhoto(filePath, image);

      // 画像のURLを取得
      const imageUrl = await getPhotoUrl(filePath);

      const photo: Photos = {
        id: 0, // idは自動生成されると仮定
        user_id: await getUserId(),
        user_name: userName,
        user_avatar: userAvatarUrl,
        photo_url: imageUrl,
        title: title,
        location: location,
        likes: 0,
        created_at: new Date().toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
        }),
      };

      await addPhoto(photo);
      toast({
        title: "成功",
        description: "写真が投稿されました！",
      });
      router.push("/home");
    } catch (error) {
      console.error(error);
      toast({
        title: "エラー",
        description: "写真の投稿に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <PhotoPostPresenter
      form={form}
      onSubmit={onSubmit}
      handleGetCurrentLocation={handleGetCurrentLocation}
    />
  );
};

export default PhotoPostContainer;
