import priceContainer from "./PriceContainer.module.scss"

export default function PriceContainer({ price, discount, isDiscountActive }) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  function getPriceInfo() {
    if (!isDiscountActive) {
      return (
        <span className={priceContainer.price}>{formatter.format(price)}</span>
      );
    } else {
      const newPrice = price * (1 - discount);

      return (
        <>
          <span className={priceContainer.discount}>{"-" + discount * 100 + "%"}</span>
          <div className={priceContainer["old-new-price-container"]}>
            <span className={priceContainer["old-price"]}>{formatter.format(price)}</span>
            <span className={priceContainer["new-price"]}>{formatter.format(newPrice)}</span>
          </div>
        </>
      );
    }
  }

  return (
    <div className={priceContainer["price-container"]}>
      {getPriceInfo()}
    </div>
  );
}