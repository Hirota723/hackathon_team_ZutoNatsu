import { getAllPhotos } from "@/api/getAllPhotos";
import { getLikes } from "@/features/ranking/api/getLikes";
import Photos from "@/entities/photos";

export const rankingData = async (): Promise<Photos[]> => {
  const photosData = await getAllPhotos();
  const likesData = await getLikes();

  const photosWithLikes = photosData.map((photo) => {
    const likeCount = likesData.filter(
      (like) => like.photo_id === photo.id
    ).length;
    return { ...photo, likeCount };
  });

  // 同率の順位を考慮してソート
  const sortedPhotos = photosWithLikes.sort(
    (a, b) => b.likeCount - a.likeCount
  );

  let rank = 1;
  let sameRankCount = 1;
  const rankedPhotos = sortedPhotos.map((photo, index, arr) => {
    if (index > 0 && photo.likeCount < arr[index - 1].likeCount) {
      rank += sameRankCount;
      sameRankCount = 1;
    } else if (index > 0 && photo.likeCount === arr[index - 1].likeCount) {
      sameRankCount++;
    }

    return {
      ...photo,
      rank,
    };
  });

  return rankedPhotos;
};
