import Gallery from "./Gallery";
import content from "../components/Content.module.scss"
import { Container } from "react-bootstrap";
import useGameByName from "../../../hooks/useGameByName";
import DescriptionCard from "./DescriptionCard";

export default function Content({ name }) {
  const { currentGame, isLoading, isError } = useGameByName(name);

  if (currentGame) {
    const screenshots = currentGame.imgUrl.screenshot;
    const cover = currentGame.imgUrl.cover;
    // Takes the longest string as the short description
    let shortDescription = "";
    if (currentGame.description.length > 0) {
      shortDescription = currentGame.description
        .reduce((accumulator, current) => {
          return accumulator.length >= current.length ? accumulator : current;
        });
    }
    const releaseDate = currentGame.releaseDate;
    const developer = currentGame.developer.join(", ");
    const publisher = currentGame.publisher.join(", ");
    const genre = currentGame.genre;
    
    return (
      <Container className="mt-4 mb-4">
        <div className={content.container}>
          <div className={content.left}>
            <Gallery screenshots={screenshots} />
          </div>
          <div className={content.right}>
            <DescriptionCard
              coverUrl={cover}
              description={shortDescription}
              releaseDate={releaseDate}
              developer={developer}
              publisher={publisher}
              genre={genre}
            />
          </div>
        </div>
      </Container>
    );
  }
}