import styles from '../scss/modules/GameCard.module.scss'
import Image from 'next/image';
import { brlCurrencyFormatter } from '../global';

export default function GameCard({ name, imgUrl, platformsNameArr, price, discount, isDiscountActive, releaseDate }) {
  const isFutureRelease = new Date() < new Date(releaseDate) || releaseDate === "";

  return (
    <div className={styles.card}>
      <div className={styles["card-img"]}>
        <Image
          src={imgUrl}
          fill
          priority
          alt=""
          sizes="30vw"
        />
        {isFutureRelease ? 
        <div className={`${styles["release-status"]}`}>
          EM BREVE
        </div> : null}
      </div>
      <div className={styles.info}>
        <div className={styles["name-platform-wrapper"]}>
          <div className={styles.name}>{name}</div>
          <div className={styles["platforms-container"]}>
            {[...platformsNameArr]?.map((name, index) => {
              return (
                <span className={styles.platform} key={index}>{name}</span>
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
        <span className={styles.price}>{formatter.format(price)}</span>
      );
    } else {
      const newPrice = price * (1 - discount);

      return (
        <>
          <span className={styles.discount}>{"-" + discount * 100 + "%"}</span>
          <div className={styles["old-new-price-container"]}>
            <span className={styles["old-price"]}>{formatter.format(price)}</span>
            <span className={styles["new-price"]}>{formatter.format(newPrice)}</span>
          </div>
        </>
      );
    }
  }

  return (
    <div className={styles["price-container"]}>
      {getPriceInfo()}
    </div>
  );
}