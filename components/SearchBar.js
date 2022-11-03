import { InputGroup, Form } from 'react-bootstrap';
import _JSXStyle from 'styled-jsx/style'

const sp = 0;

export default function SearchBar() {
  return (
    <InputGroup className="sb-input-group">
      <Form.Control
        type="text"
        className="border-end-0"
      />
      <InputGroup.Text>
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      
      <_JSXStyle>{`
        .sb-input-group:focus-within {
          box-shadow: white 0px 2px 10px;
        }
      `}</_JSXStyle>
    </InputGroup>
  );
}