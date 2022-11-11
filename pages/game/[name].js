import { useRouter } from "next/router";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Footer from "../../components/Footer";
import MainTitle from "./components/MainTitle";
import Gallery from "./components/Gallery";
import { Container } from "react-bootstrap";
import GallerySection from "./components/GallerySection";

export default function Game() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <Header/>
      <SubHeader/>
      <MainTitle name={name}/>
      <GallerySection/>
      <Footer/>
    </>
  );
}