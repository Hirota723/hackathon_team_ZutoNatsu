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
import PhotoDropdownMenu from "@/features/my-photos/components/PhotoDropdownMenu";
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
      <Card
        key={photo.id}
        className="w-full max-w-[600px] my-2 bg-transparent border-none shadow-none"
      >
        <CardHeader className="p-1">
          {!onDelete && rank == null && (
            <div className="w-3/4 flex items-center gap-2 p-1 bg-[#F4EDE3] rounded-full">
              {/* 画像 */}
              <Avatar>
                <AvatarImage src={photo.user_avatar} alt={photo.user_name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* ユーザー名 */}
              <CardDescription className="text-lg font-bold text-white bg-blue rounded-full flex items-center justify-center min-w-[150px] w-full h-8">
                {photo.user_name}
              </CardDescription>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-1 flex gap-1">
          {/* <div className="flex items-center">
              <CardTitle>{photo.title}</CardTitle>
              {onDelete && (
                <div className="ml-auto">
                  <PhotoDropdownMenu photo={photo} onDelete={onDelete} />
                </div>
              )}
            </div> */}

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
            className="cursor-pointer w-3/4"
            priority
          />
          {/* タイトル */}
          <div className="w-1/4 flex bg-[#E3D8C6] justify-center items-center rounded-lg">
            <CardTitle className="vertical-text" style = {{whiteSpace: "pre-wrap"}}>{photo.title}</CardTitle>
          </div>
        </CardContent>
        <CardFooter className="p-1 gap-3">
          {/* 場所 */}
          <div className="w-3/4 bg-[#E3D8C6] rounded-full p-1 flex flex-col items-center">
            <div className="flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 mr-1 text-blue" />
              {photo.location}
            </div>
            <div className="text-center">{photo.created_at}</div>
          </div>
          {/* いいね */}
          <div className="flex items-center gap-2">
            <HeartIcon
              className={`w-10 h-10 ${
                isLiked ? "text-red-500 " : "text-gray-400"
              }`}
              onClick={handleLike}
            />
            <p>{likes}</p>
          </div>
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
      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </>
  );
};

export default PhotoCard;
