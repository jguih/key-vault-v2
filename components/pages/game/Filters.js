import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import filterStyles from "../../../scss/modules/pages/game/Filters.module.scss";

export default function Filters({ genres, onChange }) {
  return (
    <div className={`${filterStyles.container}`}>
      <Accordion title="Categorias">
        <form>
          {genres.map((genre, index) => {
            return (
              <Form.Check
                type="checkbox"
                label={genre}
                onChange={(e) => onChange(genre, e.target.checked)}
                key={index}
              />
            );
          })}
        </form>
      </Accordion>
    </div>
  );
}

function Accordion({ title, children }) {
  const [chevron, setChevron] = useState("right");
  const accordionBodyRef = React.createRef();

  return (
    <div className={`${filterStyles.accordion}`}>
      <Button
        className={`${filterStyles["accordion-header"]}`}
        onClick={handleOnClick}
      ><i className={`bi bi-chevron-${chevron}`}></i> {title}</Button>
      <div
        className={`${filterStyles["accordion-body"]}`}
        ref={accordionBodyRef}
      >
        {children}
      </div>
    </div>
  );

  function handleOnClick() {
    // Toggle accordion body visibility
    const accordionBody = accordionBodyRef.current;
    accordionBody.classList.toggle(filterStyles["show-body"]);

    // Toggle chevron icon
    if (chevron === "right") {
      setChevron("down")
    } else {
      setChevron("right")
    }
  }
}