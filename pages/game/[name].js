import { useRouter } from "next/router";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Footer from "../../components/Footer";
import MainTitle from "./components/MainTitle";
import GallerySection from "./components/GallerySection";
import { useEffect, useState } from "react";

export default function Game() {
  const router = useRouter();
  const [ name, setName ] = useState();

  useEffect(() => {
    if (router.isReady) {
      setName(router.query.name.replaceAll("-", " "))
    }
  }, [router])
  
  return (
    <>
      <Header />
      <SubHeader />
      <MainTitle name={name} />
      <GallerySection name={name} />
      <Footer />
    </>
  );
}