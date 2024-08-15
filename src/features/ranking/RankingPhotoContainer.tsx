"use client";

import { useEffect, useState } from "react";
import RankingPhotoPresenter from "./RankingPhotoPresenter";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { rankingData } from "@/utils/rankingData";
import Photos from "@/entities/photos";

const RankingPhotoContainer = () => {
  const [ranking, setRanking] = useState<Photos[]>([]);

  useDisableScroll();

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
