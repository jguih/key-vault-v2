import lgCardStyles from "../../../scss/modules/pages/game/LanguageGamemodeCard.module.scss"

export default function LanguageGamemodeCard({ gamemode }) {
  if (gamemode) {
    return (
      <div className={`${lgCardStyles.container}`}>
        <div className={`${lgCardStyles["gamemode-container"]}`}>
          <h3>Gamemodes</h3>
          <div className={`${lgCardStyles["gamemodes"]}`}>
            {gamemode.map((gamemode, index) => {
              return (
                <div key={index}>{getGamemode(gamemode)}</div>
              )
            })}
          </div>
        </div>
        <div className={`${lgCardStyles["language-container"]}`}>
          <h3>Languages</h3>
        </div>
      </div>
    );
  }

  function getGamemode(gamemode) {
    if (gamemode.toLowerCase() === "singleplayer") {
      return (
        <span><i className="bi bi-person-fill"></i>Singleplayer</span>
      );
    } else if (gamemode.toLowerCase() === "multiplayer") {
      return (
        <span><i className="bi bi-people-fill"></i>Multiplayer</span>
      );
    } else if (gamemode.toLowerCase() === "co-op") {
      return (
        <span><i className="bi bi-people-fill"></i>Co-op</span>
      );
    }
  }
}
