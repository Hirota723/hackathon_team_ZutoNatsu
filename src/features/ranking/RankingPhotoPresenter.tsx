import Footer from "@/components/Footer";
import Photos from "@/entities/photos";
import Header from "@/components/Header";
import PhotoCardAddRank from "@/components/PhotoCardAddRank";

interface RankingPhotoPresenterProps {
  ranking: Photos[];
}

const RankingPhotoPresenter: React.FC<RankingPhotoPresenterProps> = ({
  ranking,
}) => {
  return (
    <div className="flex flex-col items-center pb-20">
      <Header />
      <div className="mt-20">
        {ranking.map((photo) => (
          <PhotoCardAddRank key={photo.id} photo={photo} rank={photo.rank} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default RankingPhotoPresenter;
