import { Container, Button } from "react-bootstrap";
import section from "../scss/modules/Section.module.scss"

export default function Section({ title, children }) {
  return (
    <Container>
      <div className={section.container}>
        <div className={section.top}>
          <h3>{title}</h3>
          <Button>Ver mais</Button>
        </div>
        <hr />
        <div className={section.content}>
          {[...children].map((child, index) => {
            return <div className={section.item} key={index}>{child}</div>
          })}
        </div>
      </div>
    </Container>
  );
}