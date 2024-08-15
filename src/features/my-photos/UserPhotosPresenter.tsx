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

      <div className="flex items-center space-x-4 p-4 w-full max-w-[600px] mt-20">
        <Avatar className="w-12 h-12">
          <AvatarImage src={userAvatarUrl} alt={userName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="bg-blue text-white px-4 py-2 rounded-full w-full">
          <h1 className="text-lg font-bold text-white bg-blue rounded-full flex items-center justify-center min-w-[150px] w-full">
            {userName}
          </h1>
        </div>
      </div>

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
