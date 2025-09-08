import Section from "../Section/Section";
import { useEffect, useState } from "react";
import Form from "../Form/Form";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import toast, { Toaster } from "react-hot-toast";
import Container from "../Container/Container";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photoWord, setPhotoWord] = useState<string>("");
  const [isSuccessSearch, setIsSuccessSearch] = useState<boolean>(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [photoSelected, setPhotoSelected] = useState<Photo | null>(null);

  const handleSearch = (query: string) => {
    setPhotoWord(query);
  };

  useEffect(() => {
    async function fetchData(query: string) {
      try {
        setPhotos([]);
        setLoader(true);

        const results = await getPhotos(query);
        if (results.photos.length === 0) {
          return toast.error("No photos found for your request.");
        }
        setPhotos(results.photos);
        setIsSuccessSearch(true);
      } catch {
        setIsSuccessSearch(false);
      } finally {
        setLoader(false);
      }
    }
    if (photoWord.trim() !== "") {
      fetchData(photoWord);
    }
  }, [photoWord]);

  const openModal = (photo: Photo) => {
    setPhotoSelected(photo);
  };

  const closeModal = () => {
    setPhotoSelected(null);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch} />
          <Toaster />
          {isLoader && <Loader />}
          {isSuccessSearch ? (
            <PhotosGallery photos={photos} onClickPhoto={openModal} />
          ) : (
            <Text />
          )}
          {photoSelected && (
            <Modal photo={photoSelected} onClose={closeModal} />
          )}
        </Container>
      </Section>
    </>
  );
}
