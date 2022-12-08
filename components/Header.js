import Link from 'next/link';
import { useState } from 'react';
import { Container, Offcanvas, Button, Dropdown } from 'react-bootstrap';
import header from '../scss/modules/Header.module.scss';
import useGenre from "../hooks/useGenre";
import * as Kv from "./ui/Kv";
import { useRouter } from 'next/router';

export default function Header({ activeKey }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={header["nav-bar"]}>
      <Container className={header["nav-bar-container"]}>
        <Link href={"/"} className={header.logo}>
          <i className={"bi bi-safe me-1"}></i>
          <span>KeyVault</span>
        </Link>
        <nav className={`${header["nav-left"]}`}>
          <Link
            href={`/`}
            className={`${(activeKey === "/" ? header.active : "")}`}
          >
            Loja
          </Link>
          <Link
            href={`/about`}
            className={`${(activeKey === "/about" ? header.active : "")}`}
          >
            Sobre
          </Link>
          <Link
            href={`/help`}
            className={`${(activeKey === "/help" ? header.active : "")}`}
          >
            Ajuda
          </Link>
        </nav>
        <div>
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
        </div>
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
  const {genres, isLoading, isError} = useGenre();
  const router = useRouter();

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
            <Link href={"/"} className={header.logo}>
              <i className={"bi bi-safe me-1"}></i>
              <span>KeyVault</span>
            </Link>
          </Offcanvas.Title>
          <Button className={`${header["offcanvas-close-btn"]}`} onClick={handleClose}>
            <i className="bi bi-x-lg"></i>
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className={`${header["offcanvas-body"]}`}>
          <nav className={`${header["nav-left"]}`}>
            <Link
              href={`/`}
              className={`${(activeKey === "/" ? header.active : "")}`}
            >
              Loja
            </Link>
            <Link
              href={`/about`}
              className={`${(activeKey === "/about" ? header.active : "")}`}
            >
              Sobre
            </Link>
            <Link
              href={`/help`}
              className={`${(activeKey === "/help" ? header.active : "")}`}
            >
              Ajuda
            </Link>
          </nav>
          <hr></hr>
          <Kv.Dropdown title="Categorias">
            {genres ? genres.map((genre, index) => {
              return (
                <Dropdown.Item
                  as="div"
                  onClick={() => {
                    router.push({
                      pathname: "/game",
                      query: { genres: genre.name.toLowerCase() }
                    })
                  }}
                  key={index}
                >
                  {genre.name}
                </Dropdown.Item>
              )
            }) : ""}
          </Kv.Dropdown>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}