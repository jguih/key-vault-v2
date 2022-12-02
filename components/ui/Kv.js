import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown as BsDropdown, Form, Row } from "react-bootstrap";
import styles from "../../scss/modules/ui/Kv.module.scss";

export function Accordion({ title, children, expand, bodyHeight, endLabel, onClickEndLabel }) {
  const [chevron, setChevron] = useState("right");
  const [bodyExpand, setBodyExpand] = useState(expand);
  const headerRef = React.createRef();

  useEffect(() => {
    if (bodyExpand) {
      setChevron("down");
      headerRef.current.classList.add(styles.active);
    } else {
      setChevron("right")
      headerRef.current.classList.remove(styles.active);
    }
  }, [bodyExpand])

  useEffect(() => {
    if (expand) {
      setBodyExpand(expand)
    }
  }, [expand])

  function toggleExpandAccordion() {
    // Toggle accordion body visibility
    setBodyExpand(state => !state);
  }

  return (
    <div className={`${styles.accordion}`}>
      <Button
        className={`${styles["accordion-header"]}`}
        onClick={toggleExpandAccordion}
        ref={headerRef}
      >
        <div className="m-0 d-flex justify-content-between">
          <span>
            <i className={`bi bi-chevron-${chevron}`}></i> {title}
          </span>
          <span onClick={onClickEndLabel}>
            {endLabel}
          </span>
        </div>
      </Button>
      <div
        className={`${styles["accordion-body"]}`}
        style={
          {
            height: `${bodyExpand ? bodyHeight : 0}px`,
            transition: "height" + 0.2 + "s" + "ease-in"
          }}
      >
        {children}
      </div>
    </div>
  );
}

export function Checkbox({ ...props }) {
  return (
    <Form.Check
      className={`${styles.checkbox}`}
      {...props}
    />
  )
}

export function FloatingInput({ label, children, ...props }) {
  return (
    <div className="mb-3">
      <div className="form-floating mb-1">
        <input className={`form-control ${styles["form-control"]}`} {...props} />
        <label htmlFor={props.name || props.id}>{label}</label>
      </div>
      {children}
    </div>
  );
}

export function FloatingTextArea({ label, ...props }) {
  return (
    <div className="form-floating mb-3">
      <textarea className={`form-control ${styles["form-control"]}`} {...props} />
      <label htmlFor={props.name || props.id}>{label}</label>
    </div>
  );
}

export function FormControl({ label, children, ...props }) {
  return (
    <>
      <Row>
        <Col sm="2">
          <label htmlFor={props.id || props.name} className="col-form-label">{label}</label>
        </Col>
        <Col className="mb-1">
          <input className={`form-control ${styles["form-control"]}`} {...props} />
        </Col>
        {children}
      </Row>
    </>
  );
}

export function InputGroup({ label, startLabel, endLabel, children, ...props }) {
  return (
    <div className="mb-3">
      {label ?
        <label
          htmlFor={props.id || props.name}
          className="form-label"
        >{label}</label> : null}

      <div className="input-group mb-1">
        {startLabel ?
          <span
            className={`input-group-text ${styles["input-group-text"]}`}
          >{startLabel}</span> : null}

        <input className={`form-control ${styles["form-control"]}`} {...props} />

        {endLabel ?
          <span
            className={`input-group-text ${styles["input-group-text"]}`}
          >{endLabel}</span> : null
        }
      </div>
      {children}
    </div>
  );
}

export function BtnCheck({ label, invisibleLabel, ...props }) {
  return (
    <>
      {invisibleLabel ?
        <label
          htmlFor={props.id || props.name}
          className="form-label d-block opacity-0"
        >a</label> : null}
      <input className="btn-check" {...props} />
      <label
        className="btn btn-outline-success"
        htmlFor={props.name || props.id}
      >{label}</label>
    </>
  );
}

export function Dropdown({ title, children, variant }) {
  function getToggleClass() {
    if (variant === "bg-900") {
      return `${styles["dropdown-toggle-900"]}`
    } else {
      return `${styles["dropdown-toggle"]}`
    }
  }

  return (
    <BsDropdown>
      <BsDropdown.Toggle className={getToggleClass()}>
        <span>{title}</span>
      </BsDropdown.Toggle>
      <BsDropdown.Menu className={`${styles["dropdown-menu"]}`}>
        {children}
      </BsDropdown.Menu>
    </BsDropdown>
  );
}