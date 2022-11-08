import card from '../scss/modules/GameCard.module.scss'
import { Badge, Image } from 'react-bootstrap';

export default function GameCard({ name, imgUrl, platforms , price }) {
  return (
    <div className={card.card}>
      <Image
        src={imgUrl || "https://via.placeholder.com/400"}
      ></Image>
      <div className={card.info}>
        <div className={card.name}>{name || "Placeholder"}</div>
        <div className={card.platforms}>
          {[...platforms].map(platform => {
            return (
              <span className={card.platform}>{platform}</span> || 
              <i className="bi bi-windows"></i>
            );
          })}
        </div>
        <div className={card.price}>{price || <Badge>R$100</Badge>}</div>
      </div>
    </div>
  );
}