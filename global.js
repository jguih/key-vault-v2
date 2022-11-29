import Link from "next/link";
import GameCard from "./components/GameCard";
import { imgTypes } from "./hooks/useGameForm";

// Generate platform icons based on its name
export function getPlatformsIcons(platformsName, options) {
  const validate = (platform) => {
    if (platform === "windows") {
      return (
        <>
          <i className="bi bi-windows me-1"></i>
          {options?.withName ? "Windows" : null}
        </>
      );
    } else if (platform === "steam") {
      return (
        <>
          <i className="bi bi-steam me-1"></i>
          {options?.withName? "Steam" : null}
        </>
      );
    }
  }

  if (platformsName) {
    if (Array.isArray(platformsName)) {
      return platformsName.map((platform) => validate(platform) );
    } else {
      return validate(platformsName);
    }
  }
  return [];
}



export function getGamemode(name) {
  switch (name?.toLowerCase()) {
    case "singleplayer":
      return (
        <><i className="bi bi-person-fill me-1"></i>Singleplayer</>
      );
    case "multiplayer":
      return (
        <><i className="bi bi-people-fill me-1"></i>Multiplayer</>
      );
    case "co-op":
      return (
        <><i className="bi bi-people-fill me-1"></i>Co-op</>
      );
    default:
      return (
        <><i className="bi bi-person-fill me-1"></i>Singleplayer</>
      );
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
        name={game.name || "InvalidName"}
        price={game.price || 0}
        discount={game.discount || 0}
        isDiscountActive={game.isDiscountActive || false}
        platformsNameArr={getPlatformsIcons(game["game_platform"]?.map(p => p.name))}
        imgUrl={game["game_image"]?.filter(img => img.type === imgTypes.Cover)[0].url || ""}
      />
    </Link>
  );
}

export function toFirstUpperCase(string) {
  return string?.[0].toUpperCase() + string?.slice(1);
}
