import React, { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import sbStyles from "../../scss/modules/ui/SearchBar.module.scss"

export default function SearchBar({ defaultValue, onSubmit, onChange, focus, ...props }) {
  const controlRef = React.createRef();
  useEffect(() => {
    if (focus) {
      controlRef.current.focus();
    }
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <InputGroup className={`${sbStyles["input-group"]}`}>
        <Form.Control
          className={`${sbStyles["form-control"]}`}
          type="text"
          placeholder="Buscar"
          name="entry"
          spellCheck="false"
          defaultValue={defaultValue ? defaultValue : null}
          onChange={onChange ? (e) => onChange(e) : null}
          ref={controlRef}
          {...props}
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