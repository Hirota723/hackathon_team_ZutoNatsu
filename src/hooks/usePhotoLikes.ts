import { useEffect, useState } from "react";
import { getUserId } from "@/api/getUserId";
import { getLikeStatus } from "@/api/getLikeStatus";
import { getLikeCount } from "@/api/getLikeCount";
import { addLike, deleteLike } from "@/api/updateLikes";
import Photos from "@/entities/photos";
import { useRouter } from "next/navigation";

export const usePhotoLikes = (photo: Photos) => {
  const router = useRouter();
  const [likes, setLikes] = useState(photo.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        setUserId(null);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!userId) {
        return;
      }

      const isLiked = await getLikeStatus(userId, photo.id);
      setIsLiked(isLiked);
    };

    fetchLikeStatus();
  }, [photo.id, userId]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      const count = await getLikeCount(photo.id);
      setLikes(count);
    };

    fetchLikeCount();
  }, [photo.id]);

  const handleLike = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    try {
      if (isLiked) {
        await deleteLike(userId, photo.id);
        setLikes(likes - 1);
        setIsLiked(false);
      } else {
        await addLike(userId, photo.id);
        setLikes(likes + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("いいねの更新エラー:", error);
    }
  };

  return { likes, isLiked, handleLike };
};
