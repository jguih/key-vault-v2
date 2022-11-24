import { Button, Form, InputGroup } from "react-bootstrap";
import sbStyles from "../../scss/modules/ui/SearchBar.module.scss"

export default function SearchBar({ defaultValue, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <InputGroup className={`${sbStyles["input-group"]}`}>
        <Form.Control
          className={`${sbStyles["form-control"]}`}
          type="text"
          placeholder="Buscar"
          name="entry"
          defaultValue={defaultValue ? defaultValue : null}
          onChange={onChange ? (e) => onChange(e) : null}
        />
        <InputGroup.Text className={`${sbStyles["input-group-text"]} p-0`}>
          <Button
            className={`${sbStyles["button"]}`}
            variant={""}
            type="submit"
          >
            <i className={`bi bi-search`}></i>
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </form>
  );
}