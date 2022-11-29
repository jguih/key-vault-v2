import { Container, Dropdown } from 'react-bootstrap';
import subHeader from "../scss/modules/SubHeader.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/router';
import useGenre from '../hooks/useGenre';
import SearchBar from './ui/SearchBar';
import * as Kv from "./ui/Kv";

export default function SubHeader({ activeKey }) {
  const router = useRouter();
  const { genres, isLoading, isError } = useGenre();

  function handleOnSubmit(e) {
    e.preventDefault();

    let myQuery = {};
    if (e.target.querySelector("input").value) {
      myQuery = {
        entry: e.target.querySelector("input").value
      }
    }

    router.push({
      pathname: "/game",
      query: myQuery
    })
  }

  return (
    <div className={subHeader["main-container"] + " sticky-top"}>
      <Container className={subHeader.container}>
        <SearchBar onSubmit={handleOnSubmit} />
        <div className={`${subHeader["responsive-dropdown"]}`}>
          <Kv.SimpleDropDown title="Navegar">
            <Link
              href={{
                pathname: "/game",
                query: { discounted: true }
              }}
              className={`${(activeKey === 0 ? subHeader.active : "")} w-100 d-block ps-3 pe-3 pt-1 pb-1`}
            >
              Promoções
            </Link>
            <Link
              href={`/game`}
              className={`${(activeKey === 0 ? subHeader.active : "")} w-100 d-block ps-3 pe-3 pt-1 pb-1`}
            >
              Novidades
            </Link>
          </Kv.SimpleDropDown>
        </div>
        <div className={`${subHeader["genre-dropdown"]}`}>
          <Kv.SimpleDropDown title="Categorias">
            {genres ? genres.map((genre, index) => {
              return (
                <Link
                  href={{
                    pathname: "/game",
                    query: { genres: genre.name.toLowerCase() }
                  }}
                  className="w-100 d-block ps-3 pe-3 pt-1 pb-1"
                  key={index}
                >
                  {genre.name}
                </Link>
              )
            }) : ""}
          </Kv.SimpleDropDown>
        </div>
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