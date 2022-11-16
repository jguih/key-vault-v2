import Link from 'next/link';
import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import header from '../scss/modules/Header.module.scss'

export default function Header({ activeKey }) {
  return (
    <div className={header["nav-bar"]}>
      <Container className={header["nav-bar-container"]}>
        <Link href={"/"}>
          <div className={header.logo}>
            <i className={"bi bi-safe me-1"}></i>
            <span>KeyVault</span>
          </div>
        </Link>
        <nav>
          {["Loja", "Sobre", "Ajuda"].map((value, index) => {
            return (
              <Link
                href={`/${value.toLowerCase() === "loja" ? "" : value.toLowerCase()}`}
                key={index}
              >
                <div 
                  className={header["nav-link"] + " " + (activeKey === index ? header.active : "")}
                >
                  {value}
                </div>
              </Link>
            );
          })}
        </nav>
        <Button
          variant="kv-primary-800"
          className="border"
          href="/login"
        >Login</Button>
      </Container>
    </div>
  );
}