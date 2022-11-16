import { Container, Row, Col, Nav, NavLink, NavItem, Dropdown, Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import header from '../scss/modules/Header.module.scss';
import subHeader from "../scss/modules/SubHeader.module.scss"
import Link from 'next/link';

export default function SubHeader({ activeKey }) {
  return (
    <div className={subHeader["main-container"] + " sticky-top"}>
      <Container className={subHeader.container + " mt-4"}>
        <SearchBar />
        <Dropdown>
          <Dropdown.Toggle>
            Categorias
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Row className="flex-nowrap">
              <Col>
                <Dropdown.Item>1st Column</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
              </Col>
              <Col>
                <Dropdown.Item>2nd Column</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
              </Col>
              <Col>
                <Dropdown.Item>3rd Column</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
                <Dropdown.Item>Genre</Dropdown.Item>
              </Col>
            </Row>
          </Dropdown.Menu>
        </Dropdown>
        <nav>
          {["Promoções", "Novidades"].map((value, index) => {
            return (
              <Link
                href={`/${value.toLowerCase() === "loja" ? "" : value.toLowerCase()}`}
                key={index}
              >
                <div
                  className={subHeader["nav-link"] + " " + 
                  (activeKey === index ? subHeader.active : "")}
                >
                  {value}
                </div>
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}