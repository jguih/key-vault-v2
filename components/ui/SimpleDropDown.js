import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import dropDownStyles from "../../scss/modules/ui/SimpleDropDown.module.scss";

export default function SimpleDropDown({ title, children }) {
  const [content, setContent] = useState();

  useEffect(() => {
    if (children) {
      if (children.length > 1) {
        setContent(
          children.map((child, index) => {
            return (
              <Dropdown.Item
                className={`${dropDownStyles["dropdown-item"]}`}
                as="div"
                key={index}
              >
                {child}
              </Dropdown.Item>
            )
          })
        );
      } else {
        setContent(
          <Dropdown.Item
            className={`${dropDownStyles["dropdown-item"]}`}
            as="div"
          >
            {children}
          </Dropdown.Item>
        );
      }
    }
  }, [title, children])

  return (
    <Dropdown className={`${dropDownStyles.dropdown}`}>
      <Dropdown.Toggle className={`${dropDownStyles["dropdown-toggle"]}`}>
        <span>{title || "Dropdown"}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={`${dropDownStyles["dropdown-menu"]}`}>
        {content}
      </Dropdown.Menu>
    </Dropdown>
  );
}