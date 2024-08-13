import Footer from "@/components/Footer";
import Photos from "@/entities/photos";
import PhotoCard from "../../components/PhotoCard";
import Header from "@/components/Header";

interface RankingPhotoPresenterProps {
  ranking: Photos[];
}

const RankingPhotoPresenter: React.FC<RankingPhotoPresenterProps> = ({
  ranking,
}) => {
  return (
    <div className="flex flex-col items-center pb-20">
      <Header />

      <h1>ランキング</h1>

      {ranking.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} rank={photo.rank} />
      ))}

      <Footer />
    </div>
  );
};

export default RankingPhotoPresenter;
