import gallery from "../../../scss/modules/pages/game/Gallery.module.scss";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Gallery({ screenshots }) {
  const [currentImg, setCurrentImg] = useState();
  const [sliderImg, setSliderImg] = useState();

  useEffect(() => {
    if (screenshots) {
      // Updates the slider images
      setSliderImg(
        screenshots.map((screenshot, index) => {
          return (
            <div className={gallery["slider-img"]} key={index}>
              <Image
                src={screenshot}
                onClick={() => setCurrentImg(<Image src={screenshot} />)}
              />
            </div>
          );
        })
      );
      // Sets the first image as the current image
      setCurrentImg(
        <Image
          src={screenshots[0]}
        />
      )
    }
  }, [screenshots])

  return (
    <div className={gallery.container}>
      <div className={gallery["gallery-img"]}>
        {currentImg}
      </div>
      <div className={gallery.slider}>
        {sliderImg}
      </div>
    </div>
  );
}