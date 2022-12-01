import Gallery from "./Gallery";
import gpBodyStyles from "../../../scss/modules/pages/game/GamePageBody.module.scss"
import { Container, Alert } from "react-bootstrap";
import DescriptionCard from "./DescriptionCard";
import SaleCard from "./SaleCard";
import Description from "./Description";
import SystemReq from "./SystemReq";
import LanguageGamemodeCard from "./LanguageGamemodeCard";
import SubHeader from "../../SubHeader";
import Title from "./Title";
import { imgTypes } from "../../../global";
import useGame from "../../../hooks/useGame";
import { useEffect, useState } from "react";

export default function Content({ name }) {
  const { games, isLoading, isError } = useGame();
  const [currentGame, setCurrentGame] = useState();

  useEffect(() => {
    // Waits for games and name to be defined
    if (games && name) {
      // Gets the current game
      games.forEach((game) => {
        if (game.name.toLowerCase() === name) {
          setCurrentGame(game);
        }
      });
    }
  }, [games, name]);

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
    const screenshot = currentGame["game_image"]?.filter(img => img.type === imgTypes.Screenshot);
    const screenshotUrl = screenshot?.map(s => s.url);
    const cover = currentGame["game_image"]?.filter(img => img.type === imgTypes.Cover);
    const coverUrl = cover?.map(c => c.url);
    const artwork = currentGame["game_image"]?.filter(img => img.type === imgTypes.Artwork);
    const artworkUrl = artwork?.map(a => a.url);
    const shortDescription = new String(currentGame.description)?.split(". ")[0];
    const description = currentGame.description;
    const releaseDate = currentGame.releaseDate;
    console.log(currentGame.developer)
    const developer = currentGame.developer;
    const publisher = currentGame.publisher;
    const genre = currentGame["game_genre"];
    const price = currentGame.price;
    const discount = currentGame.discount;
    const isDiscountActive = currentGame.isDiscountActive;
    const name = currentGame.name;
    const sysReq = currentGame["game_system_requirements"];
    const gamemode = currentGame["game_gamemode"];
    const languageSupport = currentGame["game_language_support"];
    const platform = currentGame["game_platform"];

    return (
      <Container className="mt-4 mb-4">
        <SubHeader />
        <Title
          title={name}
          platformsName={platform?.map(p => p.name)}
        />
        <div className={gpBodyStyles.container}>
          <div className={gpBodyStyles.left}>
            <Gallery screenshots={screenshotUrl?.concat(artworkUrl)} alt="" />
            <SaleCard
              coverUrl={coverUrl[0]}
              title={name}
              price={price}
              discount={discount}
              isDiscountActive={isDiscountActive}
            />
            <Description
              description={description ?? ""}
            />
            <hr></hr>
            <SystemReq
              sysReq={sysReq}
            />
          </div>
          <div className={gpBodyStyles.right}>
            <DescriptionCard
              coverUrl={coverUrl[0]}
              description={shortDescription}
              releaseDate={releaseDate}
              developer={developer}
              publisher={publisher}
              genreNameArr={genre?.map(genre => genre.name)}
              alt=""
            />
            <LanguageGamemodeCard
              gamemodeName={gamemode?.map(g => g.name)}
              languageSupport={languageSupport}
            />
          </div>
        </div>
      </Container>
    );
  }
}