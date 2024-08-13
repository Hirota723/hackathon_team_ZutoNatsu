import Photos from "@/entities/photos";
import PhotoCard from "@/components/PhotoCard";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";

interface UserPhotosPresenterProps {
  userName: string;
  userAvatarUrl: string;
  photos: Photos[];
  onDelete: (photoId: number) => void;
}

const UserPhotosPresenter: React.FC<UserPhotosPresenterProps> = ({
  userName,
  userAvatarUrl,
  photos,
  onDelete,
}) => {
  return (
    <div className="flex flex-col items-center pb-20">
      <Header />

      <Avatar>
        <AvatarImage src={userAvatarUrl} alt={userName} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1>{userName}さんの投稿</h1>

      <hr className="my-4 w-full border-gray-300" />

      {photos.length === 0 ? (
        <div>投稿された写真がありません。</div>
      ) : (
        photos.map((photo) => (
          <div key={photo.id}>
            <PhotoCard photo={photo} onDelete={onDelete} />
          </div>
        ))
      )}

      <Footer />
    </div>
  );
};

export default UserPhotosPresenter;
