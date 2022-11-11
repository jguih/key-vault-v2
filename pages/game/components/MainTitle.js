import { Container } from "react-bootstrap";
import mainTitle from "./MainTitle.module.scss"

export default function MainTitle({ id }) {
  return (
    <Container className="mt-4 mb-4">
      <div className={mainTitle.container}>
        <div className={mainTitle.title}>
          {"Marvel's Spider Man"}
        </div>
        <div className={mainTitle["platforms-container"]}>
          <i className="bi bi-windows"></i>
          <i className="bi bi-steam"></i>
        </div>
      </div>
    </Container>
  );
}