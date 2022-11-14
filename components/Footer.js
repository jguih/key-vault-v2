import { Container, Navbar } from "react-bootstrap";
import footer from "../scss/modules/Footer.module.scss"

export default function Footer() {
  return (
    <Navbar variant="dark" expand="sm" className="shadow text-bg-kv-primary-800">
      <Container className="justify-content-start flex-nowrap">
        <Navbar.Brand className={footer.logo + " " + "m-0 p-0"}>
          <i className={"bi bi-safe me-1 "}></i>
          <span>KeyVault</span>
        </Navbar.Brand>
        <div className={footer.container}>
          © 2022 KeyVault Corporation. Todos os direitos reservados.
          Todas as marcas são propriedade dos seus respectivos donos nos EUA e em outros países.
          IVA incluso em todos os preços onde aplicável.
        </div>
      </Container>
    </Navbar>
  );
}