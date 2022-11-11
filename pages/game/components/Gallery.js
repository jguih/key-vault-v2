import gallery from "./Gallery.module.scss";
import { Image } from "react-bootstrap";
import useGame from "../../../hooks/useGame";
import { useEffect, useState } from "react";

export default function Gallery({ name }) {
  const { games, isLoading, isError } = useGame();
  const [ currentImg, setCurrentImg ] = useState();
  const [ currentGame, setCurrentGame ] = useState();
  const [ sliderImg, setSliderImg ] = useState();

  useEffect(() => {
    // Waits for games and name to be defined
    if (games && name) {
      // Gets the current game
      games.forEach((game) => {
        if (game.name.toLowerCase() === name) {
          setCurrentGame(game);
          //setCurrentImg(game.imgUrl.artwork[0])
        }
      });
    }
  }, [games, name])

  useEffect(() => {
    if (currentGame && currentGame.imgUrl.artwork) {
      // Updates the slider images
      setSliderImg(
        currentGame.imgUrl.artwork.map((artwork, index) => {
          return (
            <div className={gallery["slider-img"]} key={index}>
              <Image 
                src={artwork}
                onClick={() => setCurrentImg(artwork)}
              />
            </div>
          );
        })
      );
      // Sets the first image as the current image if none is being displayed
      if (!currentImg) {
        setCurrentImg(currentGame.imgUrl.artwork[0])
      }
    }
  }, [currentGame])

  return (
    <div className={gallery.container}>
      <div className={gallery["gallery-img"]}>
        <Image
          src={currentImg}
        />
      </div>
      <div className={gallery.slider}>
        {sliderImg}
      </div>  
    </div>
  );
}