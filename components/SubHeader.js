import { Container, Dropdown, InputGroup, Form, Button } from 'react-bootstrap';
import subHeader from "../scss/modules/SubHeader.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/router';
import useGenre from '../hooks/useGenre';

export default function SubHeader({ activeKey }) {
  const router = useRouter();

  function handleOnSubmit(e) {
    e.preventDefault();

    let myQuery = { ...router.query };
    if (e.target.querySelector("input").value) {
      myQuery = {
        entry: e.target.querySelector("input").value
      }
    } else {
      delete myQuery.entry;
    }

    router.push({
      pathname: "/game",
      query: myQuery
    })
  }

  return (
    <div className={subHeader["main-container"] + " sticky-top"}>
      <Container className={subHeader.container}>
        <MySearchBar onSubmit={handleOnSubmit} />
        <MyResponsiveDropDown activeKey={activeKey} />
        <GenresDropdown />
        <nav>
          <Link
            href={{
              pathname: "/game",
              query: { discounted: true }
            }}
            className={`${(activeKey === 0 ? subHeader.active : "")}`}
          >
            Promoções
          </Link>
          <Link
            href={{
              pathname: "/game",
              query: { tags: "recently added" }
            }}
            className={`${(activeKey === 1 ? subHeader.active : "")}`}
          >
            Novidades
          </Link>
        </nav>
      </Container>
    </div>
  );
}

function GenresDropdown() {
  const router = useRouter();
  const { genres, isLoading, isError } = useGenre();

  function handleOnClick(e) {
    router.push({
      pathname: "/game",
      query: {
        genres: e.target.innerText.toLowerCase()
      }
    })
  }

  if (genres) {
    return (
      <Dropdown className={`${subHeader.dropdown}`}>
        <Dropdown.Toggle className={`${subHeader["dropdown-toggle"]}`}>
          <span>Categorias</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className={`${subHeader["dropdown-menu"]}`}>
          {genres.map((genre, index) => {
            return (
              <Dropdown.Item
                className={`${subHeader["dropdown-item"]}`}
                as="span"
                onClick={handleOnClick}
                key={index}
              >
                {genre.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

function MySearchBar({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <InputGroup className={`${subHeader["input-group"]}`}>
        <Form.Control
          className={`${subHeader["form-control"]}`}
          type="text"
          placeholder="Buscar"
        />
        <InputGroup.Text className={`${subHeader["input-group-text"]} p-0`}>
          <Button
            className={`${subHeader["button"]}`}
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

function MyResponsiveDropDown({ activeKey }) {
  return (
    <Dropdown className={`${subHeader["responsive-dropdown"]}`}>
      <Dropdown.Toggle className={`${subHeader["dropdown-toggle"]}`}>
        <span>Navegar</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={`${subHeader["dropdown-menu"]}`}>
        <Dropdown.Item className={`${subHeader["dropdown-item"]}`} as="div">
          <Link
            href={`/genres`}
            target="_blank"
            className={`${(activeKey === 0 ? subHeader.active : "")}`}
          >
            Categorias
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className={`${subHeader["dropdown-item"]}`} as="div">
          <Link
            href={`/discounted`}
            target="_blank"
            className={`${(activeKey === 0 ? subHeader.active : "")}`}
          >
            Promoções
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className={`${subHeader["dropdown-item"]}`} as="div">
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