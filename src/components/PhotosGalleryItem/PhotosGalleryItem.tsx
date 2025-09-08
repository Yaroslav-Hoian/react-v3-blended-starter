import type { Photo } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  onClickPhoto: (photo: Photo) => void;
}

export default function PhotosGalleryItem({
  photo,
  onClickPhoto,
}: PhotosGalleryItemProps) {
  const handleClick = (): void => {
    onClickPhoto(photo);
  };

  return (
    <div
      className={styles.thumb}
      style={{
        backgroundColor: photo.avg_color,
        borderColor: photo.avg_color,
      }}
      onClick={handleClick}
    >
      <img src={photo.src.large} alt={photo.alt} />
    </div>
  );
}
