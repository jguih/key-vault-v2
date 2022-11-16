import { InputGroup, Form, Button } from 'react-bootstrap';
import searchBar from "../../scss/modules/search-bar/SearchBar.module.scss";

export default function SearchBar() {
  return (
    <InputGroup className={`sb-input-group w-auto`}>
      <Form.Control className={`${searchBar["form-control"]}`}
        type="text"
        placeholder="Buscar"
      />
      <InputGroup.Text className={`${searchBar["input-text"]} p-0`}>
        <Button className={`${searchBar["button"]}`} variant={""}>
          <i className={`bi bi-search`}></i>
        </Button>
      </InputGroup.Text>
    </InputGroup>
  );
}