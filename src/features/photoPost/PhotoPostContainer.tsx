"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import PhotoPostPresenter from "./PhotoPostPresenter";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { getUser } from "@/api/getUser";
import { getUserId } from "@/api/getUserId";
import { addPhoto } from "./api/addPhoto";
import { getPhotoUrl, uploadPhoto } from "./api/photoStorage";
import { fetchAddress, formatAddress } from "./api/LocationService";
import Photos from "@/entities/photos";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { formSchema } from "@/utils/formSchema";

const PhotoPostContainer = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [isLoading, setIsLoadingLocation] = useState<Boolean>(false);

  const { toast } = useToast();

  useDisableScroll();

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

  const startLocationFetch = (e: React.MouseEvent) => {
    e.preventDefault();

    // ローディングを開始
    setIsLoadingLocation(true);

    // 位置情報の取得を試みる
    handleGetCurrentLocation()
      .catch((error) => {
        console.error("位置情報の取得に失敗しました:", error);

        // エラーメッセージを表示
        toast({
          title: "エラー",
          description:
            "位置情報の取得に失敗しました。位置情報の利用を許可してください。",
          variant: "destructive",
        });
      })
      .finally(() => {
        // ローディングを終了
        setIsLoadingLocation(false);
      });
  };

  const handleGetCurrentLocation = async () => {
    return new Promise<void>((resolve, reject) => {
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

            resolve();
          },
          (error) => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        reject(new Error("このブラウザでは位置情報が取得できません。"));
      }
    });
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
      startLocationFetch={startLocationFetch}
      isLoading={isLoading}
    />
  );
};

export default PhotoPostContainer;
