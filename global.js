import Link from "next/link";
import GameCard from "./components/GameCard";

// Generate platform icons based on it name
export function getPlatformsIcons(platforms) {
  if (platforms) {
    return platforms.map((platform, index) => {
      const _platform = platform.toLowerCase();

      if (_platform === "windows") {
        return <i className="bi bi-windows" key={index}></i>;
      } else if (_platform === "steam") {
        return <i className="bi bi-steam" key={index}></i>
      }
    });
  }
}

export const brlCurrencyFormatter =
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

export function createGameCard(game) {
  return (
    <Link href={`/game/${(game.name.toLowerCase().replaceAll(" ", "-"))}`} key={game.id}>
      <GameCard
        name={game.name}
        price={game.price}
        discount={game.discount}
        isDiscountActive={game.isDiscountActive}
        platforms={getPlatformsIcons(game.platforms)}
        imgUrl={game.imgUrl.cover}
      />
    </Link>
  );
}
