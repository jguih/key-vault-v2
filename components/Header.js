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
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start align-items-center" activeKey={activeKey}>
              <Nav.Link href="/" className={header["text"]}>Loja</Nav.Link>
              <Nav.Link href="/about" className={header["text"]}>Sobre</Nav.Link>
              <Nav.Link href="/help" className={header["text"]}>Ajuda</Nav.Link>
            </Nav>
            <Nav className="justify-content-end align-items-center w-100">
                <Button
                  variant="kv-primary-700"
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