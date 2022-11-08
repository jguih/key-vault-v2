import { Container, Image } from "react-bootstrap";
import outdoor from '../scss/modules/Outdoor.module.scss'

export default function Outdoor({ mainImgUrl }) {
  return (
    <Container>
      <div className={outdoor.outdoor}>
        <Image 
          src={mainImgUrl}
          width="100%"
        />
        <div className={outdoor.cards}>
          <div className={outdoor.item}></div>
          <div className={outdoor.item}></div>
          <div className={outdoor.item}></div>
          <div className={outdoor.item}></div>
        </div>
      </div>
    </Container>
  );
}