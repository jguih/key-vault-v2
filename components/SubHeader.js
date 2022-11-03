import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';

export default function SubHeader() {
  return (
    <Container>
      <Row className="align-content-center">
        <Col xs="4">
          <SearchBar/>
        </Col>
      </Row>
    </Container>
  );
}