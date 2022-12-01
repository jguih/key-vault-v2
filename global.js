import Link from "next/link";
import GameCard from "./components/GameCard";
import { Icon } from '@iconify/react';

export const imgTypes = {
  Cover: "cover",
  Screenshot: "screenshot",
  Artwork: "artwork"
}

export const GameSystemRequirements = {
  Minimum: "minimum",
  Recommended: "recommended"
}

export const GameFields = {
  name: "name",
  description: "description",
  developer: "developer",
  publisher: "publisher",
  releaseDate: "releaseDate",
  price: "price",
  discount: "discount",
  isDiscountActive: "isDiscountActive",
  GameLanguageSupport: "game_language_support",
  GameSystemRequirements: "game_system_requirements",
  GameSystemRequirementsFields: {
    type: "type",
    so: "so",
    storage: "storage",
    cpu: "cpu",
    memory: "memory",
    gpu: "gpu",
    directx: "directx",
    internet: "internet",
    other: "other"
  },
  GamePlatform: "game_platform",
  GameGenre: "game_genre",
  GameGamemode: "game_gamemode",
  GameImage: "game_image"
}

export const IGDBImageSize = {
  cover_big: "cover_big",
  original: "original"
}

export function getIGDBImageURL(size, id) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${id}.jpg`
}

export function getFullDate(milliseconds) {
  if (!milliseconds) return;
  const firstReleaseDate = new Date(new Date().getTime() + milliseconds);
  const year = firstReleaseDate.getFullYear();
  const month = integerFormatter.format(firstReleaseDate.getMonth());
  const day = integerFormatter.format(firstReleaseDate.getDay());
  if (year && day && month) {
    return `${year}-${month}-${day === "00" ? "01" : day}`;
  } else return;
}

// Generate platform icons based on its name
export function getPlatformsIcons(platformsName, options) {
  const validate = (platform, index) => {
    switch (platform) {
      case "steam":
        return (
          <span key={index}>
            <i className="bi bi-steam me-1"></i>
            {options?.withName ? "Steam" : null}
          </span>
        );
      
      case "epic":
        return (
          <span key={index}>
            <Icon icon="cib:epic-games" className="me-1" />
            {options?.withName ? "Epic" : null}
          </span>
        );

      case "gog":
        return (
          <span key={index}>
            <Icon icon="simple-icons:gogdotcom" className="me-1"/>
            {options?.withName ? "Gog" : null}
          </span>
        );
    }
  }

  if (platformsName) {
    if (Array.isArray(platformsName)) {
      return platformsName.map((platform, index) => validate(platform, index));
    } else {
      return validate(platformsName, 1);
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
    case "co-operative":
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
  Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

export const integerFormatter =
  Intl.NumberFormat('pt-BR', {
    minimumIntegerDigits: 2
  })

// Creates a game card from game object
export function createGameCard(game) {
  return (
    <Link href={`/game/${(game.name.toLowerCase().replaceAll(" ", "-"))}`} key={game.id}>
      <GameCard
        name={game.name || "InvalidName"}
        price={game.price || 0}
        discount={game.discount || 0}
        isDiscountActive={game.isDiscountActive || false}
        platformsNameArr={getPlatformsIcons(game[GameFields.GamePlatform]?.map(p => p.name))}
        imgUrl={game["game_image"]?.filter(img => img.type === imgTypes.Cover)[0].url || ""}
      />
    </Link>
  );
}

export function toFirstUpperCase(string) {
  return string?.[0].toUpperCase() + string?.slice(1);
}