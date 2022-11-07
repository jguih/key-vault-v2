import card from '../scss/modules/Card.module.scss'
import { Image } from 'react-bootstrap';

export default function Card({ imgSrc, title, platforms, price }) {
  return (
    <div className={card.card}>
      <Image
        src={imgSrc}
      ></Image>
      <div className={card.info}>
        <div className={card.title}>{title}</div>
        <div className={card.platforms}>{platforms}</div>
        <div className={card.price}>{price}</div>
      </div>
    </div>
  );
}