import card from '../scss/modules/Card.module.scss'
import { Badge, Image } from 'react-bootstrap';

export default function Card({ imgSrc, title , platforms , price }) {
  return (
    <div className={card.card}>
      <Image
        src={imgSrc || "https://via.placeholder.com/400"}
      ></Image>
      <div className={card.info}>
        <div className={card.title}>{title || "Placeholder"}</div>
        <div className={card.platforms}>{platforms || <i className="bi bi-windows"></i>}</div>
        <div className={card.price}>{price || <Badge>R$100</Badge>}</div>
      </div>
    </div>
  );
}