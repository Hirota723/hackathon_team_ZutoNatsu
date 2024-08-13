"use client";

import { useEffect, useState } from "react";
import PhotoFeedPresenter from "./PhotoFeedPresenter";
import { getAllPhotos } from "@/api/getAllPhotos";
import Photos from "@/entities/photos";

const PhotoFeedContainer = () => {
  const [photos, setPhotos] = useState<Photos[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      const photos = await getAllPhotos();
      setPhotos(photos);
    };

    getPhotos();
  }, []);

  return <PhotoFeedPresenter photos={photos} />;
};

export default PhotoFeedContainer;
