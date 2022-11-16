import { Dropdown } from "react-bootstrap";
import dropdown from "../../scss/modules/dropdown/KVDropdown.module.scss"

export default function DropdownItem({children}) {
  return (
    <Dropdown.Item className={`${dropdown["dropdown-item"]}`}>
      {children}
    </Dropdown.Item>
  );
}