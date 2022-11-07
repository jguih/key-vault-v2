import { Container, Image } from "react-bootstrap";
import container from '../scss/modules/Container.module.scss'
import outdoor from '../scss/modules/Outdoor.module.scss'

export default function Outdoor() {
  return (
    <Container className="mt-4">
      <div className={outdoor.outdoor}>
        <div className={outdoor.item}>
          <Image
            src="https://via.placeholder.com/1100x600"
            className="rounded"
          ></Image>
        </div>
        <div className={outdoor.item}>
          <div className={outdoor.grid}>
            <div className={outdoor["grid-item"]}>
              <Image
                src="https://via.placeholder.com/250x150"
                className="rounded"
              ></Image>
            </div>
            <div className={outdoor["grid-item"]}>
              <Image
                src="https://via.placeholder.com/250x150"
                className="rounded"
              ></Image>
            </div>
            <div className={outdoor["grid-item"]}>
              <Image
                src="https://via.placeholder.com/250x150"
                className="rounded"
              ></Image>
            </div>
            <div className={outdoor["grid-item"]}>
              <Image
                src="https://via.placeholder.com/250x150"
                className="rounded"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}