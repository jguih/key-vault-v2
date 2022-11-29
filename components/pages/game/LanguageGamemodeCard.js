import { OverlayTrigger, Tooltip } from "react-bootstrap";
import lgCardStyles from "../../../scss/modules/pages/game/LanguageGamemodeCard.module.scss"
import LanguageSupport from "../../ui/LanguageSupport";

export default function LanguageGamemodeCard({ gamemodeName, languageSupport }) {
  if (!gamemodeName || !languageSupport) return;
  return (
    <div className={`${lgCardStyles.container}`}>
      <div className={`${lgCardStyles["gamemode-container"]}`}>
        <h3>Modos de Jogo</h3>
        {gamemodeName.map((name, index) => getGamemode(name, index))}
      </div>
      <LanguageSupport title={"Idiomas"} languageSupport={languageSupport} />
    </div>
  );

  function getGamemode(name, index) {
    switch (name?.toLowerCase()) {
      case "singleplayer":
        return (
          <p key={index}><i className="bi bi-person-fill"></i> Singleplayer</p>
        );
      case "multiplayer":
        return (
          <p key={index}> <i className="bi bi-people-fill"></i> Multiplayer</p>
        );
      case "co-op":
        return (
          <p key={index}><i className="bi bi-people-fill"></i> Co-op</p>
        );
      default:
        return (
          <p key={index}><i className="bi bi-person-fill"></i> Singleplayer</p>
        );
    }
  }
}
