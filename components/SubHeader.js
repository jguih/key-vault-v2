import { Container, Row, Col, Nav, NavLink, NavItem, Dropdown, Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import header_styles from '../scss/modules/Header.module.scss';

export default function SubHeader() {
  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto">
          <SearchBar />
        </Col>
        <Col xs="auto">
          <Navbar variant="dark">
            <Nav className={header_styles["text"]}>
              <Dropdown as={NavItem}>
                <Dropdown.Toggle
                  as={NavLink}
                >
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
              <Nav.Link href="/discount">Promoções</Nav.Link>
              <Nav.Link href="/recent">Novidades</Nav.Link>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}