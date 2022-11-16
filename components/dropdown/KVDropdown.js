import dropdown from "../../scss/modules/dropdown/KVDropdown.module.scss"
import { Dropdown } from 'react-bootstrap';

export default function DropDown({children, title}) {
  return (
    <Dropdown>
      <Dropdown.Toggle className={`${dropdown["dropdown-toggle"]}`}>
        <span className={`${dropdown["dropdown-toggle-text"]}`}>
          {title}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={`${dropdown["dropdown-menu"]}`}>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
}