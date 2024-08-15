import PhotoCard from "@/components/PhotoCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Photos from "@/entities/photos";

interface Props {
  photos: Photos[];
}

const PhotoFeedPresenter: React.FC<Props> = ({ photos }) => {
  return (
    <div className="flex flex-col items-center pb-20">
      <Header />
      <div className="mt-20">
        {photos
          .slice()
          .reverse()
          .map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default PhotoFeedPresenter;
