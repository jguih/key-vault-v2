import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import sb_styles from '../styles/SearchBar.module.scss';

export default function SearchBar() {
  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className={sb_styles["sb-input-group"]}>
            <Form.Control
              type="text"
              className="border-end-0"
            />
            <InputGroup.Text>
              <i class="bi bi-search"></i>
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}