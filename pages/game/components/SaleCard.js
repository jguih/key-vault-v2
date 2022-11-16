import Link from "next/link";
import { Button, Image } from "react-bootstrap";
import saleCard from "./SaleCard.module.scss";
import PriceContainer from "../../../components/price-container/PriceContainer"

export default function SaleCard({ coverUrl, title, price, discount, isDiscountActive }) {
  return (
    <div className={`${saleCard.container}`}>
      <div className={`${saleCard["img-wrapper"]}`}>
        <Image
          src={coverUrl}
        />
      </div>
      <div className={`${saleCard["sale-info"]}`}>
        <div>
          <h3>{title}</h3>
          <p className={`${saleCard.activation}`}>
            <span className={`${saleCard["bold-500"]}`}>Ativação: </span>Steam <br />
            Produto ativado através de <Link href={"/activation"} target="_blank">chave de ativação.</Link>
          </p>
        </div>
        <div>
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
    </div>
  );
}