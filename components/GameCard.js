import card from '../scss/modules/GameCard.module.scss'
import { Image } from 'react-bootstrap';
import { brlCurrencyFormatter } from '../global';

export default function GameCard({ name, imgUrl, platforms, price, discount, isDiscountActive }) {
  return (
    <div className={card.card}>
      <div className={card["card-img"]}>
        <Image
          src={imgUrl}
        ></Image>
      </div>
      <div className={card.info}>
        <div className={card["name-platform-wrapper"]}>
          <div className={card.name}>{name}</div>
          <div className={card["platforms-container"]}>
            {[...platforms].map((platform, index) => {
              return (
                <span className={card.platform} key={index}>{platform}</span>
              );
            })}
          </div>
        </div>
        <PriceContainer 
          price={price} 
          discount={discount} 
          isDiscountActive={isDiscountActive}
        />
      </div>
    </div>
  );
}

// Component that display the price and discount
function PriceContainer({ price, discount, isDiscountActive }) {
  const formatter = brlCurrencyFormatter;

  function getPriceInfo() {
    if (!isDiscountActive) {
      return (
        <span className={card.price}>{formatter.format(price)}</span>
      );
    } else {
      const newPrice = price * (1 - discount);

      return (
        <>
          <span className={card.discount}>{"-" + discount * 100 + "%"}</span>
          <div className={card["old-new-price-container"]}>
            <span className={card["old-price"]}>{formatter.format(price)}</span>
            <span className={card["new-price"]}>{formatter.format(newPrice)}</span>
          </div>
        </>
      );
    }
  }

  return (
    <div className={card["price-container"]}>
      {getPriceInfo()}
    </div>
  );
}