import { Container, Row, Col, Nav, NavLink, NavItem, Dropdown } from 'react-bootstrap';
import SearchBar from './SearchBar';
import header_styles from '../styles/Header.module.scss';

export default function SubHeader() {
  return (
    <Container>
      <Row className="align-items-center justify-content-start">
        <Col xs="4">
          <SearchBar />
        </Col>
        <Col>
          <Nav className={header_styles["header-text"]}>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink} className="text-white">Categoria</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Promoções</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}