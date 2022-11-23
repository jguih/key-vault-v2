import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import saleCard from "../../../scss/modules/pages/game/SaleCard.module.scss";
import { brlCurrencyFormatter } from "../../../global";

export default function SaleCard({ coverUrl, title, price, discount, isDiscountActive }) {
  return (
    <div className={`${saleCard.container}`}>
      <div className={`${saleCard["img-wrapper"]}`}>
        <Image
          src={coverUrl}
          alt=""
          fill
          priority
          sizes="25vw"
        />
      </div>
      <div className={`${saleCard["sale-info-container"]}`}>
        <h3>{title}</h3>
        <div className={`${saleCard["game-version"]}`}>Jogo Base</div>
        <p>
          <span className={`${saleCard["bold-500"]}`}>Ativação: </span>Steam <br />
          Produto ativado através de <Link href={"/activation"} target="_blank">chave de ativação.</Link>
        </p>
      </div>
      <div className={`${saleCard["price-btn-container"]}`}>
        <PriceContainer
          price={price}
          discount={discount}
          isDiscountActive={isDiscountActive}
        />
        <Button className={`${saleCard.button}`}>
          Comprar
        </Button>
      </div>
    </div>
  );
}

function PriceContainer({ price, discount, isDiscountActive }) {
  const formatter = brlCurrencyFormatter;

  function getPriceInfo() {
    if (!isDiscountActive) {
      return (
        <span className={saleCard.price}>{formatter.format(price)}</span>
      );
    } else {
      const newPrice = price * (1 - discount);

      return (
        <>
          <span className={saleCard.discount}>{"-" + discount * 100 + "%"}</span>
          <div className={`${saleCard["old-new-price-container"]}`}>
            <span className={saleCard["old-price"]}>{formatter.format(price)}</span>
            <span className={saleCard["new-price"]}>{formatter.format(newPrice)}</span>
          </div>
        </>
      );
    }
  }

  return (
    <div className={saleCard["price-container"]}>
      {getPriceInfo()}
    </div>
  );
}