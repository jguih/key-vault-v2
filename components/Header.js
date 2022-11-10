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
        <div className={header.button}><i className="bi bi-list"></i></div>
        <Nav className={"me-auto " + header.nav} activeKey={activeKey}>
          <Nav.Link href="/" className={header["text"]}>Loja</Nav.Link>
          <Nav.Link href="/about" className={header["text"]}>Sobre</Nav.Link>
          <Nav.Link href="/help" className={header["text"]}>Ajuda</Nav.Link>
        </Nav>
        <Nav className={header.nav}>
          <Button
            variant="kv-primary-700"
            className="border"
            href="/login"
          >Login</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}