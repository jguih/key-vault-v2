import card from '../scss/modules/GameCard.module.scss'
import { Badge, Image } from 'react-bootstrap';

export default function GameCard({ name, imgUrl, platforms, price, discount, isDiscountActive }) {

  function getPriceInfo() {
    if (!isDiscountActive) {
      return <span className={card.price}>{"R$ " + price}</span>
    } else {
      const newPrice = price * (1 - discount);

      return (
        <>
          <span className={card.discount}>{"-" + discount * 100 + "%"}</span>
          <span className={card["old-price"]}>{"R$ " + price}</span>
          <span className={card["new-price"]}>{"R$ " + newPrice}</span>
        </>
      );
    }
  }

  return (
    <div className={card.card}>
      <Image
        src={imgUrl || "https://via.placeholder.com/400"}
      ></Image>
      <div className={card.info}>
        <div className={card.name}>{name}</div>
        <div className={card.platforms}>
          {[...platforms].map(platform => {
            return (
              <span className={card.platform}>{platform}</span>
            );
          })}
        </div>
        <div className={card["price-info"]}>
          {getPriceInfo()}
        </div>
      </div>
    </div>
  );
}