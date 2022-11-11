import { Container } from "react-bootstrap";
import Gallery from "./Gallery";

export default function GallerySection({ name }) {
  return (
    <Container className="mt-4 mb-4">
      <Gallery name={name}/>
    </Container>
  );
}