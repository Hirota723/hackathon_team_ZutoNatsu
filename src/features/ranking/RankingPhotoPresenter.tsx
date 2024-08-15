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

      <h1 className="text-lg font-bold p-2 mt-20">ランキング</h1>

      {ranking.map((photo) => (
        <PhotoCardAddRank key={photo.id} photo={photo} rank={photo.rank} />
      ))}

      <Footer />
    </div>
  );
};

export default RankingPhotoPresenter;
