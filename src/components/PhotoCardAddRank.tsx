import { useState } from "react";
import { usePhotoLikes } from "@/hooks/usePhotoLikes";
import ImageModal from "./ImageModal";
import Photos from "@/entities/photos";
import PhotoCard from "./PhotoCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription } from "@/components/ui/card";

interface Props {
  photo: Photos;
  rank?: number | null;
  onDelete?: (photoId: number) => void;
}

const PhotoCardAddRank: React.FC<Props> = ({
  photo,
  rank = null,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { likes, isLiked, handleLike } = usePhotoLikes(photo);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // rankに基づいてスタイルを決定するロジック
  const getRankStyle = (rank: number | null) => {
    if (rank === null) return {};

    if (rank === 1) {
      return { color: "gold", fontSize: "1.75rem" };
    } else if (rank === 2) {
      return { color: "silver", fontSize: "1.5rem" };
    } else if (rank === 3) {
      return { color: "brown", fontSize: "1.25rem" };
    } else if (rank > 3) {
      return { color: "gray", fontSize: "1.25rem" };
    }
    return {};
  };

  return (
    <>
      {rank !== null && rank > 3 ? (
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-[600px] my-2"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className=" flex items-center gap-2 py-1 bg-[#E3D8C6] rounded-full mx-4 px-3 border-none">
              <div className="flex">
                <p className="text-lg font-bold">{rank}</p>
                <p className="text-lg font-bold">位</p>
              </div>
              {/* 画像 */}
              <Avatar>
                <AvatarImage src={photo.user_avatar} alt={photo.user_name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* ユーザー名 */}
              <CardDescription className="text-lg font-bold text-white bg-blue rounded-full flex items-center justify-center min-w-[100px] w-full h-8">
                {photo.user_name}
              </CardDescription>
            </AccordionTrigger>
            <AccordionContent>
              <PhotoCard key={photo.id} photo={photo} rank={photo.rank} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="my-2 w-full max-w-[600px]">
          <div className="flex items-center gap-2 py-1 px-3 bg-[#E3D8C6] rounded-full mx-4">
            <div className="flex">
              <p className="font-bold text-shadow" style={getRankStyle(rank)}>
                {rank}
              </p>
              <p className="font-bold text-shadow" style={getRankStyle(rank)}>
                位
              </p>
            </div>
            <Avatar>
              <AvatarImage src={photo.user_avatar} alt={photo.user_name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardDescription className="text-lg font-bold text-white bg-blue rounded-full flex items-center justify-center min-w-[100px] w-full h-8">
              {photo.user_name}
            </CardDescription>
          </div>
          <PhotoCard key={photo.id} photo={photo} rank={photo.rank} />
        </div>
      )}

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

export default PhotoCardAddRank;
