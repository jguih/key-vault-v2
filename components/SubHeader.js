import { Container, Dropdown } from 'react-bootstrap';
import subHeader from "../scss/modules/SubHeader.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/router';
import useGenre from '../hooks/useGenre';
import SearchBar from './ui/SearchBar';
import * as Kv from "./ui/Kv";

export default function SubHeader() {
  const router = useRouter();
  const { genres, isLoading, isError } = useGenre();

  function handleOnSubmit(e) {
    e.preventDefault();

    let myQuery = {sort: "nameAsc"};
    if (e.target.querySelector("input").value) {
      myQuery = {
        entry: e.target.querySelector("input").value,
      }
    }

    router.push({
      pathname: "/game",
      query: myQuery
    })
  }

  function onClickGenre(genre) {
    router.push({
      pathname: "/game",
      query: {
        genres: genre.name.toLowerCase(),
        sort: "nameAsc"
      }
    })
  }

  function onClickDiscounted() {
    router.push({
      pathname: "/game",
      query: {
        discounted: true,
        sort: "priceAsc"
      }
    })
  }

  function onClickRecent() {
    router.push({
      pathname: "/game",
      query: {
        sort: "releaseDateDesc"
      }
    })
  }

  return (
    <Container className={`${subHeader["main-container"]} sticky-top`}>
      <SearchBar onSubmit={handleOnSubmit} />
      <div className={`${subHeader["responsive-dropdown"]}`}>
        <Kv.Dropdown title="Navegar">
          <Dropdown.Item as="div" onClick={() => onClickDiscounted()}>
            Promoções
          </Dropdown.Item>
          <Dropdown.Item as="div" onClick={() => onClickRecent()}>
            Novidades
          </Dropdown.Item>
        </Kv.Dropdown>
      </div>
      <div className={`${subHeader["genre-dropdown"]}`}>
        <Kv.Dropdown title="Categorias" variant="bg-900">
          {genres ? genres.map((genre, index) => {
            return (
              <Dropdown.Item
                as="div"
                onClick={() => onClickGenre(genre)}
                key={index}
              >
                {genre.name}
              </Dropdown.Item>
            )
          }) : ""}
        </Kv.Dropdown>
      </div>
      <nav>
        <Link
          href={{
            pathname: "/game",
            query: { 
              discounted: true,
              sort: "priceAsc" 
            }
          }}
        >
          Promoções
        </Link>
        <Link
          href={{
            pathname: "/game",
            query: {
              sort: "releaseDateDesc"
            }
          }}
        >
          Novidades
        </Link>
      </nav>
    </Container>
  );
}