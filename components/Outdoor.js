import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Image from "next/image";
import { brlCurrencyFormatter, imgTypes } from "../global";
import outdoor from '../scss/modules/Outdoor.module.scss';

export default function Outdoor({ games, size }) {
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState();
  const interval = 6000; // Outdoor timer interval

  useEffect(() => {
    clearInterval(timer);

    // Sets the initial timer
    setTimer(
      setInterval(() => {
        setIndex(prevVal => prevVal + 1 <= size - 1 ? prevVal + 1 : 0);
      }, interval)
    );

    return () => clearInterval(timer);
  }, [games, size]);

  useEffect(() => {
    // Updates the current outdoor image
    const outdoorImages = document.querySelector(`.${outdoor["outdoor-img"]}`);
    if (outdoorImages) {
      const activeImg = outdoorImages.querySelector(`.${outdoor["img-show"]}`);
      activeImg.classList.remove(outdoor["img-show"]);
      outdoorImages.children[index].classList.add(outdoor["img-show"]);
    }

    // Highlights the current smallGameCard at index with a white bar below
    const cardsGrid = document.querySelector(`.${outdoor["cards-grid"]}`)
    if (cardsGrid) {
      const activeSmallCard = cardsGrid.querySelector(`.${outdoor["bar-show"]}`)
      activeSmallCard.classList.remove(outdoor["bar-show"]);
      // Gets the 'bar' element from smallGameCard at index
      const cardBar =
        cardsGrid.children[index].children[0].querySelector(`.${outdoor.bar}`);
      cardBar.classList.add(outdoor["bar-show"]);
    }

  }, [index])

  function getSmallGameCard(game, index) {
    return (
      <div
        className={outdoor.item}
        key={index}
        onClick={() => handleOnClick(index)}
      >
        <div className={outdoor["small-game-card"]}>
          <Image
            src={game["game_image"].filter(img => img.type === imgTypes.Cover)[0].url}
            alt=""
            fill
            priority
            sizes="30vw"
          />
          <div
            className={`${outdoor.bar} ${index === 0 ? outdoor["bar-show"] : ""}`}
          ></div>
          <div className={outdoor["title-container"]}>
            <span className={outdoor.title}>{game.name}</span>
          </div>
        </div>
      </div>
    );
  }

  function handleOnClick(index) {
    // Handle onClick events for the game cards
    setIndex(index);
    // Clear the current timer and restart it
    clearInterval(timer);
    setTimer(
      setInterval(() => {
        setIndex(prevVal => prevVal + 1 <= size - 1 ? prevVal + 1 : 0);
      }, interval)
    );
  }

  if (!games) return

  const { name, price, discount, isDiscountActive } = games[index];
  return (
    <Container className="mt-4">
      <div className={outdoor.outdoor}>
        <div className={outdoor["outdoor-img"]}>
          {games.slice(0, size).map((game, index) => {
            return (
              <Image
                src={game["game_image"].filter(img => img.type === imgTypes.Artwork)[0].url}
                fill
                priority
                alt=""
                sizes="100vw"
                key={index}
                className={index === 0 ? outdoor["img-show"] : ""}
              />
            );
          })}
        </div>
        <div className={outdoor["outdoor-content"]}>
          <Link href={`/game/${(name.toLowerCase().replaceAll(" ", "-"))}`}>
            <p>{name}</p>
            <PriceContainer
              price={price}
              discount={discount}
              isDiscountActive={isDiscountActive}
            />
          </Link>
          <Button className={`${outdoor["btn"]}`}>Comprar</Button>
        </div>
        <div className={outdoor["cards-grid"]}>
          {games.slice(0, size).map((game, index) => getSmallGameCard(game, index))}
        </div>
      </div>
    </Container>
  );
}

// Component that display the price and discount
function PriceContainer({ price, discount, isDiscountActive }) {
  const formatter = brlCurrencyFormatter;

  function getPriceInfo() {
    if (!isDiscountActive) {
      return (
        <span className={outdoor.price}>{formatter.format(price)}</span>
      );
    } else {
      const newPrice = price * (1 - discount);

      return (
        <>
          <span className={outdoor.discount}>{"-" + discount * 100 + "%"}</span>
          <span className={outdoor["old-price"]}>{formatter.format(price)}</span>
          <span className={outdoor["new-price"]}>{formatter.format(newPrice)}</span>
        </>
      );
    }
  }

  return (
    <div className={outdoor["price-container"]}>
      {getPriceInfo()}
    </div>
  );
}