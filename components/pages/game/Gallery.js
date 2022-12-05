import gallery from "../../../scss/modules/pages/game/Gallery.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Gallery({ screenshots, alt }) {
  const [currentImg, setCurrentImg] = useState();

  useEffect(() => {
    if (screenshots) {
      // Sets the first image as the current image
      setCurrentImg(
        <Image
          src={screenshots[0]}
          fill
          priority
          alt={alt}
          sizes="(max-width: 576px) 100vw
                  50vw"
        />
      )
    }
  }, [screenshots, alt])

  return (
    <div className={gallery.container}>
      <div className={gallery["current-img"]}>
        {currentImg}
      </div>
      <div className={gallery.slider}>
        {screenshots?.map((screenshot, index) => {
          return (
            <div className={gallery["slider-img"]} key={index}>
              <Image
                src={screenshot}
                fill
                priority
                alt=""
                sizes="25vw"
                onClick={() => setCurrentImg(
                  <Image
                    src={screenshot}
                    fill 
                    priority
                    alt={alt}
                    sizes="(max-width: 576px) 100vw
                            50vw"
                  />
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}