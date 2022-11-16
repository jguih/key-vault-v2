import { InputGroup, Form, Button } from 'react-bootstrap';

export default function SearchBar() {
  return (
    <InputGroup className="sb-input-group w-auto">
      <Form.Control
        type="text"
        placeholder="Buscar"
      />
      <InputGroup.Text className="p-0">
        <Button variant="kv-primary-700">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup.Text>
    </InputGroup>
  );
}