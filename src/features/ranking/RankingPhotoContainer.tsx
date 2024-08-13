"use client";

import { useEffect, useState } from "react";
import RankingPhotoPresenter from "./RankingPhotoPresenter";
import Photos from "@/entities/photos";
import { rankingData } from "@/utils/rankingData";

const RankingPhotoContainer = () => {
  const [ranking, setRanking] = useState<Photos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rankedPhotos = await rankingData();
        setRanking(rankedPhotos);
      } catch (error) {
        console.error("データの取得エラー:", error);
      }
    };

    fetchData();
  }, []);

  return <RankingPhotoPresenter ranking={ranking} />;
};

export default RankingPhotoContainer;
