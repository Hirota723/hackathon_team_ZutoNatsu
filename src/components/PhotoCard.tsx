import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePhotoLikes } from "@/hooks/usePhotoLikes";
// import PhotoDropdownMenu from "@/features/my-photos/components/PhotoDropdownMenu";
import ImageModal from "./ImageModal";
import { HeartIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/20/solid";
import Photos from "@/entities/photos";

interface Props {
  photo: Photos;
  rank?: number | null;
  onDelete?: (photoId: number) => void;
}

const PhotoCard: React.FC<Props> = ({ photo, rank = null, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { likes, isLiked, handleLike } = usePhotoLikes(photo);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card key={photo.id} className="w-[350px]">
        <CardHeader>
          {rank && <span className="font-bold text-xl">{rank}</span>}

          {!onDelete && (
            <div className="flex items-center gap-4">
              {/* 画像 */}
              <Avatar>
                <AvatarImage src={photo.user_avatar} alt={photo.user_name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* ユーザー名 */}
              <CardDescription>{photo.user_name}</CardDescription>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex items-center">
            {/* 写真 */}
            <Image
              src={
                photo.photo_url ||
                "https://cdn2.aprico-media.com/production/imgs/images/000/047/172/original.jpg?1580205234"
              }
              alt={photo.title}
              width={350}
              height={350}
              onClick={handleImageClick}
              className="cursor-pointer"
              priority
            />

            {/* タイトル */}
            <div className="flex items-center">
              <CardTitle>{photo.title}</CardTitle>
            </div>
          </div>

          {/* 場所 */}
          <div className="flex bg-[#E3D8C6]">
            <MapPinIcon className="w-6 h-6 mr-1 text-blue-500" />
            {photo.location}
          </div>

          {/* いいね */}
          <div className="flex pl-64 gap-2">
            <HeartIcon
              className={`w-6 h-6 ${
                isLiked ? "text-red-500 " : "text-gray-400"
              }`}
              onClick={handleLike}
            />
            <p>{likes}</p>
          </div>
        </CardContent>

        {/* 日付 */}
        <CardFooter className="flex justify-between">
          <div className="text-gray-400">{photo.created_at}</div>
        </CardFooter>
      </Card>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={
          photo.photo_url ||
          "https://cdn2.aprico-media.com/production/imgs/images/000/047/172/original.jpg?1580205234"
        }
        imageAlt={photo.title}
      />
    </>
  );
};

export default PhotoCard;
