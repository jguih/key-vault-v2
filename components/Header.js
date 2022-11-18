import Link from 'next/link';
import { useState } from 'react';
import { Container, Offcanvas, Button, CloseButton } from 'react-bootstrap';
import header from '../scss/modules/Header.module.scss'

export default function Header({ activeKey }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={header["nav-bar"]}>
      <Container className={header["nav-bar-container"]}>
        <Link href={"/"}>
          <div className={header.logo}>
            <i className={"bi bi-safe me-1"}></i>
            <span>KeyVault</span>
          </div>
        </Link>
        <nav className={`${header["nav-left"]}`}>
          <Link href={`/store`}>
            <div
              className={`${header["nav-link"]} ${(activeKey === 0 ? header.active : "")}`}
            >
              Loja
            </div>
          </Link>
          <Link href={`/about`}>
            <div
              className={`${header["nav-link"]} ${(activeKey === 1 ? header.active : "")}`}
            >
              Sobre
            </div>
          </Link>
          <Link href={`/help`}>
            <div
              className={`${header["nav-link"]} ${(activeKey === 2 ? header.active : "")}`}
            >
              Ajuda
            </div>
          </Link>
        </nav>
        <nav>
          <Button
            variant="kv-primary-800"
            className={`${header["offcanvas-btn"]}`}
            onClick={handleShow}
          >
            <i className="bi bi-list"></i>
          </Button>
          <Button
            variant="kv-primary-800"
            className={`${header["btn"]} border`}
            href="/login"
          >
            Login
          </Button>
        </nav>
      </Container>
      <MyOffcanvas
        show={show}
        handleClose={handleClose}
        activeKey={activeKey}
      />
    </div>
  );
}

function MyOffcanvas({ show, handleClose, activeKey }) {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        className={`${header.offcanvas}`}
        placement="end"
      >
        <Offcanvas.Header className={`${header["offcanvas-header"]}`}>
          <Offcanvas.Title className={`${header["offcanvas-title"]}`}>
            <Link href={"/"}>
              <div className={header.logo}>
                <i className={"bi bi-safe me-1"}></i>
                <span>KeyVault</span>
              </div>
            </Link>
          </Offcanvas.Title>
          <Button className={`${header["offcanvas-close-btn"]}`} onClick={handleClose}>
            <i className="bi bi-x-lg"></i>
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className={`${header["offcanvas-body"]}`}>
          <nav className={`${header["nav-left"]}`}>
            <Link href={`/store`}>
              <div
                className={`${header["nav-link"]} ${(activeKey === 0 ? header.active : "")}`}
              >
                Loja
              </div>
            </Link>
            <Link href={`/about`}>
              <div
                className={`${header["nav-link"]} ${(activeKey === 1 ? header.active : "")}`}
              >
                Sobre
              </div>
            </Link>
            <Link href={`/help`}>
              <div
                className={`${header["nav-link"]} ${(activeKey === 2 ? header.active : "")}`}
              >
                Ajuda
              </div>
            </Link>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}