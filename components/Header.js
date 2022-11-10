import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import header from '../scss/modules/Header.module.scss'

export default function Header({ activeKey }) {
  return (
    <Navbar variant="dark" expand="sm" className="shadow text-bg-kv-primary-800">
      <Container>
        <Navbar.Brand href="/" className={header.logo}>
          <i className={"bi bi-safe me-1"}></i>
          <span>KeyFrame</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas className="text-bg-kv-primary-800">
          <Offcanvas.Header closeButton >
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto" activeKey={activeKey}>
              <Nav.Link href="/" className={header["text"]}>Loja</Nav.Link>
              <Nav.Link href="/about" className={header["text"]}>Sobre</Nav.Link>
              <Nav.Link href="/help" className={header["text"]}>Ajuda</Nav.Link>
            </Nav>
            <Nav className="align-items-center">
              <Button
                variant="kv-primary-800"
                className="border"
                href="/login"
              >Login</Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}