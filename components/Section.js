import { Container, Button } from "react-bootstrap";
import section from "../scss/modules/Section.module.scss"

export default function Section({ title, children }) {
  return (
    <Container className="mt-4">
      <div className={section.container}>
        <div className={section.top}>
          <h3>{title}</h3>
          <Button>Ver mais</Button>
        </div>
        <hr />
        <div className={section.content}>
          {[...children].map((child) => {
            return <div className={section.item}>{child}</div>
          })}
        </div>
      </div>
    </Container>
  );
}