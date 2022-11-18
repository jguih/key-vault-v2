import { Container, Dropdown, InputGroup, Form, Button } from 'react-bootstrap';
import subHeader from "../scss/modules/SubHeader.module.scss"
import Link from 'next/link';

export default function SubHeader({ activeKey }) {
  return (
    <div className={subHeader["main-container"] + " sticky-top"}>
      <Container className={subHeader.container}>
        <MySearchBar />
        <MyResponsiveDropDown activeKey={activeKey} />
        <MyDropdown />
        <nav>
          <Link
            href={`/discounted`}
            target="_blank"
            className={`${(activeKey === 0 ? subHeader.active : "")}`}
          >
            Promoções
          </Link>
          <Link
            href={`/recently-added`}
            target="_blank"
            className={`${(activeKey === 1 ? subHeader.active : "")}`}
          >
            Novidades
          </Link>
        </nav>
      </Container>
    </div>
  );
}

function MyDropdown() {
  return (
    <Dropdown className={`${subHeader.dropdown}`}>
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
    <InputGroup className={`${subHeader["input-group"]}`}>
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

function MyResponsiveDropDown({ activeKey }) {
  return (
    <Dropdown className={`${subHeader["responsive-dropdown"]}`}>
      <Dropdown.Toggle className={`${subHeader["dropdown-toggle"]}`}>
        <span>Navegar</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={`${subHeader["dropdown-menu"]}`}>
        <Dropdown.Item className={`${subHeader["dropdown-item"]}`}>
          <Link
            href={`/genres`}
            target="_blank"
            className={`${(activeKey === 0 ? subHeader.active : "")}`}
          >
            Categorias
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className={`${subHeader["dropdown-item"]}`}>
          <Link
            href={`/discounted`}
            target="_blank"
            className={`${(activeKey === 0 ? subHeader.active : "")}`}
          >
            Promoções
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className={`${subHeader["dropdown-item"]}`}>
          <Link
            href={`/recently-added`}
            target="_blank"
            className={`${(activeKey === 0 ? subHeader.active : "")}`}
          >
            Novidades
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}