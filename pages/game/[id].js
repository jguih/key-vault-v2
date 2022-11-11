import { useRouter } from "next/router";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Footer from "../../components/Footer";
import MainTitle from "./components/MainTitle";
import Gallery from "./components/Gallery";
import { Container } from "react-bootstrap";

export default function Game() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header/>
      <SubHeader/>
      <MainTitle id={id}/>

      <Container className="mb-4 mt-4 d-flex gap-4">
        <Gallery/>
      </Container>

      <Footer/>
    </>
  );
}