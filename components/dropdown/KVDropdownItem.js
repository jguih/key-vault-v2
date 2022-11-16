import { Dropdown } from "react-bootstrap";
import dropdown from "./KVDropdown.module.scss"

export default function DropdownItem({children}) {
  return (
    <Dropdown.Item className={`${dropdown["dropdown-item"]}`}>
      {children}
    </Dropdown.Item>
  );
}