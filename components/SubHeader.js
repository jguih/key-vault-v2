import { Container } from 'react-bootstrap';
import SearchBar from './search-bar/SearchBar';
import subHeader from "../scss/modules/SubHeader.module.scss"
import Link from 'next/link';
import KVDropdown from './dropdown/KVDropdown';
import KVDropdownItem from './dropdown/KVDropdownItem';

export default function SubHeader({ activeKey }) {
  return (
    <div className={subHeader["main-container"] + " sticky-top"}>
      <Container className={subHeader.container + " mt-4"}>
        <SearchBar />
        <KVDropdown title="Categorias">
          <KVDropdownItem>
            Genre 1
          </KVDropdownItem>
          <KVDropdownItem>
            Genre 2
          </KVDropdownItem>
          <KVDropdownItem>
            Genre 3
          </KVDropdownItem>
        </KVDropdown>
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