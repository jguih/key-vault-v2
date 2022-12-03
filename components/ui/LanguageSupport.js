import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toFirstUpperCase } from "../../global";
import styles from "../../scss/modules/ui/LanguageSupport.module.scss"

export default function LanguageSupport({ title, languageSupport, variant, onClickLanguage, ...props }) {
  if (!languageSupport) return;
  if (Array.isArray(languageSupport) && languageSupport?.length === 0) return;
  
  function getLanguageSupport(language_support, index) {
    const ptBRName = toFirstUpperCase(language_support.language?.["ptBR_name"]);
    const _audio = language_support.audio || false;
    const _interface = language_support.interface || false;
    const _subtitles = language_support.subtitles || false;

    return (
      <div 
        className={`${styles["language-container"]}`} 
        key={index}
        onClick={() => onClickLanguage?.(language_support)}
      >
        <p>{ptBRName}</p>
        <div className={`${styles.language}`}>
          {_audio ? <i className="bi bi-check2-circle"></i> :
            <i className={`bi bi-check2-circle ${styles.invisible}`}></i>}
          {_subtitles ? <i className="bi bi-check2-circle"></i> :
            <i className={`bi bi-check2-circle ${styles.invisible}`}></i>}
          {_interface ? <i className="bi bi-check2-circle"></i> :
            <i className={`bi bi-check2-circle ${styles.invisible}`}></i>}
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

  let validProps = props;
  delete validProps.className;

  return (
    <div
      className={`${styles["language-support-container"]} 
        ${variant === "secondary" ? styles.secondary : ""} 
        ${variant === "hover" ? styles.hover : ""}`}
      {...validProps}
    >
      {title ? <h3>{title}</h3> : null}
      <div className={`${styles["legend-container"]}`}>
        <div></div>
        <div className={`${styles.legend}`}>
          {getLegend()}
        </div>
      </div>
      <hr />
      {Array.isArray(languageSupport) ?
        languageSupport?.map((language_support, index) => {
          return getLanguageSupport(language_support, index)
        }) : getLanguageSupport(languageSupport)}
    </div>
  );
}