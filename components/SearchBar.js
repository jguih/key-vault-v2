import { InputGroup, Form, Button } from 'react-bootstrap';
import _JSXStyle from 'styled-jsx/style'

const sp = 0;

export default function SearchBar() {
  return (
    <InputGroup className="sb-input-group">
      <Form.Control
        type="text"
        placeholder="Buscar"
      />
      <InputGroup.Text className="p-0">
        <Button variant="kf-primary-700">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup.Text>
    </InputGroup>
  );
}