import { Navbar, Container, Nav, Offcanvas, Button, Row, Col } from 'react-bootstrap';
import KeyFrameLogo from '../public/KeyVault_Logo.svg';
import AccountBox from '../public/account-box.svg'
import Image from 'next/image';
import styles from '../styles/Header.module.scss'

export default function Header({ activeKey }) {
  return (
    <Navbar bg="kf-primary-800" variant="dark" expand="sm" className="shadow">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src={KeyFrameLogo}
            height="42"
            alt="Key frame logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start align-items-center" activeKey={activeKey}>
              <Nav.Link href="/" className={styles.text}>Loja</Nav.Link>
              <Nav.Link href="/about" className={styles.text}>Sobre</Nav.Link>
              <Nav.Link href="/help" className={styles.text}>Ajuda</Nav.Link>
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