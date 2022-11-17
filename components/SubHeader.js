import { Container, Dropdown, InputGroup, Form, Button } from 'react-bootstrap';
import subHeader from "../scss/modules/SubHeader.module.scss"
import Link from 'next/link';

export default function SubHeader({ activeKey }) {
  return (
    <div className={subHeader["main-container"] + " sticky-top"}>
      <Container className={subHeader.container + " mt-4"}>
        <MySearchBar />
        <MyDropdown />
        <nav>
          {["Promoções", "Novidades"].map((value, index) => {
            return (
              <Link
                href={`/${value.toLowerCase() === "loja" ? "" : value.toLowerCase()}`}
                key={index}
              >
                <div
                  className={subHeader["nav-link"] + " " +
                    (activeKey === index ? subHeader.active : "")}
                >
                  {value}
                </div>
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}

function MyDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle className={`${subHeader["dropdown-toggle"]}`}>
        <span>Categorias</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={`${subHeader["dropdown-menu"]}`}>
        <Dropdown.Item className={`${subHeader["dropdown-item"]}`}>
          <span>Genre 1</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function MySearchBar() {
  return (
    <InputGroup className={`w-auto`}>
      <Form.Control className={`${subHeader["form-control"]}`}
        type="text"
        placeholder="Buscar"
      />
      <InputGroup.Text className={`${subHeader["input-group-text"]} p-0`}>
        <Button className={`${subHeader["button"]}`} variant={""}>
          <i className={`bi bi-search`}></i>
        </Button>
      </InputGroup.Text>
    </InputGroup>
  );
}