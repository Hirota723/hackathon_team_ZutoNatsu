import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // 年、月、日の取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1
  const day = String(date.getDate()).padStart(2, "0"); // 日を2桁に

  // YYYY/MM/DD形式で返す
  return `${year}月${month}日${day}`;
};

const PhotoCard: React.FC<Props> = ({ photo, rank = null, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { likes, isLiked, handleLike } = usePhotoLikes(photo);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // タイトルを改行で分割
  const titleParts = photo.title.split("\n");

  return (
    <>
      <Card
        key={photo.id}
        className="w-full max-w-[600px] my-2 px-4 bg-transparent border-none shadow-none"
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
        <div className="flex items-center">
          {onDelete && (
            <div className="ml-auto">
              <PhotoDropdownMenu photo={photo} onDelete={onDelete} />
            </div>
          )}
        </div>
        <CardContent className="p-1 flex gap-1">
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
            <div className="vertical-text">
              {titleParts.map((part, index) => (
                <div
                  key={index}
                  className={
                    index === 0
                      ? "text-lg font-bold"
                      : index === 1
                      ? "text-lg font-bold mt-10"
                      : index === 2
                      ? "text-lg font-bold mt-20"
                      : ""
                  }
                >
                  {part}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-1 gap-3">
          {/* 場所 */}
          <div className="w-3/4 bg-[#E3D8C6] rounded-full p-1 flex flex-col items-center px-4">
            <div className="flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 mr-1 text-blue" />
              {photo.location}
            </div>
            <div className="text-center">{formatDate(photo.created_at)}</div>
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
