import Link from "next/link";
import GameCard from "./components/GameCard";
import { imgTypes } from "./hooks/useGameForm";

// Generate platform icons based on it name
export function getPlatformsIcons(platformsName) {
  if (platformsName) {
    return platformsName.map((platform, index) => {
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

export const decimalFormatter = 
  Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

// Creates a game card from game object
export function createGameCard(game) {
  return (
    <Link href={`/game/${(game.name.toLowerCase().replaceAll(" ", "-"))}`} key={game.id}>
      <GameCard
        name={game.name}
        price={game.price}
        discount={game.discount}
        isDiscountActive={game.isDiscountActive}
        platformsNameArr={getPlatformsIcons(game["game_platform"].map(p => p.name))}
        imgUrl={game["game_image"].filter(img => img.type === imgTypes.Cover)[0].url}
      />
    </Link>
  );
}
