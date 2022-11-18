import Gallery from "./Gallery";
import content from "../../../scss/modules/pages/game/Content.module.scss"
import { Container, Alert } from "react-bootstrap";
import useGameByName from "../../../hooks/useGameByName";
import DescriptionCard from "./DescriptionCard";
import SaleCard from "./SaleCard";
import Description from "./Description";
import SystemReq from "./SystemReq";
import LanguageGamemodeCard from "./LanguageGamemodeCard";

export default function Content({ name }) {
  const { currentGame, isLoading, isError } = useGameByName(name);

  if (isLoading) {
    return (
      <Container>
        <Alert variant="success">Loading...</Alert>
      </Container>
    );
  }
  
  if (isError) {
    return (
      <Container>
        <Alert variant="danger">Failed to load</Alert>
      </Container>
    );
  } 

  if (currentGame) {
    const screenshots = currentGame.imgUrl.screenshot;
    const cover = currentGame.imgUrl.cover;
    const artworks = currentGame.imgUrl.artwork;
    // Takes the shortest string as the short description
    let shortDescription = "";
    if (currentGame.description.length > 0) {
      shortDescription = currentGame.description
        .reduce((accumulator, current) => {
          return accumulator.length <= current.length ? accumulator : current;
        });
    }
    const description = currentGame.description;
    const releaseDate = currentGame.releaseDate;
    const developer = currentGame.developer.join(", ");
    const publisher = currentGame.publisher.join(", ");
    const genre = currentGame.genre;
    const price = currentGame.price;
    const discount = currentGame.discount;
    const isDiscountActive = currentGame.isDiscountActive;
    const name = currentGame.name;
    const sysReq = currentGame.sysReq;
    const gamemode = currentGame.gamemode;
    const languageSupport = currentGame.languageSupport;

    return (
      <Container className="mt-4 mb-4">
        <div className={content.container}>
          <div className={content.left}>
            <Gallery screenshots={screenshots.concat(artworks)} />
            <SaleCard
              coverUrl={cover}
              title={name}
              price={price}
              discount={discount}
              isDiscountActive={isDiscountActive}
            />
            <Description
              description={description}
            />
            <hr></hr>
            <SystemReq
              sysReq={sysReq}
            />
          </div>
          <div className={content.right}>
            <DescriptionCard
              coverUrl={artworks[0]}
              description={shortDescription}
              releaseDate={releaseDate}
              developer={developer}
              publisher={publisher}
              genre={genre}
            />
            <LanguageGamemodeCard 
              gamemode={gamemode}
              languageSupport={languageSupport}
            />
          </div>
        </div>
      </Container>
    );
  }
}