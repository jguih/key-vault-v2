import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import header_styles from '../scss/modules/Header.module.scss'

export default function Header({ activeKey }) {
  return (
    <Navbar variant="dark" expand="sm" className="shadow text-bg-kf-primary-700">
      <Container>
        <Navbar.Brand href="/">
          <i className={"bi bi-safe me-1 " + header_styles["logo-text"]}></i>
          <span className={header_styles["logo-text"]}>KeyFrame</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start align-items-center" activeKey={activeKey}>
              <Nav.Link href="/" className={header_styles["text"]}>Loja</Nav.Link>
              <Nav.Link href="/about" className={header_styles["text"]}>Sobre</Nav.Link>
              <Nav.Link href="/help" className={header_styles["text"]}>Ajuda</Nav.Link>
            </Nav>
            <Nav className="justify-content-end align-items-center w-100">
                <Button
                  variant="kf-primary-800"
                  className="border"
                >Login</Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}