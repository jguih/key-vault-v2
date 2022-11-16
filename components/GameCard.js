import card from '../scss/modules/GameCard.module.scss'
import { Image } from 'react-bootstrap';
import PriceContainer from '../components/price-container/PriceContainer';

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