import { OverlayTrigger, Tooltip } from "react-bootstrap";
import lgCardStyles from "../../../scss/modules/pages/game/LanguageGamemodeCard.module.scss"

export default function LanguageGamemodeCard({ gamemode, languageSupport }) {
  if (gamemode && languageSupport) {
    return (
      <div className={`${lgCardStyles.container}`}>
        <div className={`${lgCardStyles["gamemode-container"]}`}>
          <h3>Modos de Jogo</h3>
          {gamemode.map((gamemode, index) => getGamemode(gamemode, index))}
        </div>
        <div className={`${lgCardStyles["language-support-container"]}`}>
          <h3>Idioma</h3>
          <div className={`${lgCardStyles["legend-container"]}`}>
            <div></div>
            <div className={`${lgCardStyles.legend}`}>
              {getLegend()}
            </div>
          </div>
          <hr />
          {languageSupport.map((language, index) => getLanguage(language, index))}
        </div>
      </div>
    );
  }

  function getGamemode(gamemode, index) {
    switch (gamemode.toLowerCase()) {
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

  function getLanguage(language, index) {
    const ptBRName = language.ptBRName[0].toUpperCase() + language.ptBRName.slice(1);
    const _audio = language.audio;
    const _interface = language.interface;
    const _subtitles = language.subtitles;

    return (
      <div className={`${lgCardStyles["language-container"]}`} key={index}>
        <p>{ptBRName}</p>
        <div className={`${lgCardStyles.language}`}>
          {_audio ? <i className="bi bi-check2-circle"></i> :
            <i className={`bi bi-check2-circle ${lgCardStyles.invisible}`}></i>}
          {_subtitles ? <i className="bi bi-check2-circle"></i> :
            <i className={`bi bi-check2-circle ${lgCardStyles.invisible}`}></i>}
          {_interface ? <i className="bi bi-check2-circle"></i> :
            <i className={`bi bi-check2-circle ${lgCardStyles.invisible}`}></i>}
        </div>
      </div>
    );
  }

  function getLegend() {
    return (
      <>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              Audio
            </Tooltip>
          }
        >
          <i className="bi bi-volume-up-fill"></i>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              Legenda
            </Tooltip>
          }
        >
          <i className="bi bi-card-text"></i>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              Interface
            </Tooltip>
          }
        >
          <i className="bi bi-display-fill"></i>
        </OverlayTrigger>
      </>
    )
  }
}
