"use client";

import { useEffect, useState } from "react";
import UserPhotosPresenter from "./UserPhotosPresenter";
import { useToast } from "@/components/ui/use-toast";
import Photos from "@/entities/photos";
import { getUserId } from "@/api/getUserId";
import { getUserPhotos } from "./api/getUserPhotos";
import { deletePhoto } from "./api/deletePhoto";
import { useRouter } from "next/navigation";
import { getUser } from "@/api/getUser";

const UserPhotosContainer = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [photos, setPhotos] = useState<Photos[]>([]);

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

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const userId = await getUserId();
        if (!userId) {
          throw new Error("ユーザーIDが取得できませんでした");
        }

        const userPhotos = await getUserPhotos(userId);
        setPhotos(userPhotos);
      } catch (error) {
        toast({
          title: "エラー",
          description: "写真の取得に失敗しました。",
          variant: "destructive",
        });
      }
    };

    fetchUserPhotos();
  }, []);

  const onDelete = async (photoId: number) => {
    try {
      await deletePhoto(photoId);
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId)
      );
      toast({
        title: "成功",
        description: "写真が削除されました！",
      });
    } catch (error) {
      toast({
        title: "エラー",
        description: "写真の削除に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <UserPhotosPresenter
      userName={userName}
      userAvatarUrl={userAvatarUrl}
      photos={photos}
      onDelete={onDelete}
    />
  );
};

export default UserPhotosContainer;
