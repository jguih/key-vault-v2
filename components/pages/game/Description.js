import { useEffect } from "react";
import { Button } from "react-bootstrap";
import styleDescription from "../../../scss/modules/pages/game/Description.module.scss";
import styleSystemReq from "../../../scss/modules/pages/game/SystemReq.module.scss";

export default function Description({ description }) {

  useEffect(() => {
    const container = document.querySelector(`.${styleDescription.container}`);
    
    if (container) {
      if (container.clientHeight > 250) {
        // Collapse the container
        container.classList.add(styleDescription["collapse-container"]);
  
        // Show "show more" button
        const showMoreBtn = container.querySelector(`.${styleDescription["show-more-btn"]}`);
        showMoreBtn.classList.add(styleDescription["display-btn"]);
      }
    }
  }, [document.querySelector(`.${styleDescription.container}`)])

  if (description.length > 0) {
    return (
      <div className={`${styleDescription.container}`}>
        <h3>About the Game</h3>
        {description.map((description, index) => {
          return <p key={index}>{description}</p>
        })}
        <Button
          className={`${styleDescription["show-more-btn"]}`}
          onClick={() => handleOnClickShowMore()}
        >Show More <i className="bi bi-chevron-down"></i></Button>
        <Button
          className={`${styleDescription["show-less-btn"]}`}
          onClick={() => handleOnClickShowLess()}
        >Show Less <i className="bi bi-chevron-up"></i></Button>
      </div>
    );
  }

  function handleOnClickShowMore() {
    // Expand container
    const container = document.querySelector(`.${styleDescription.container}`);
    container.classList.remove(styleDescription["collapse-container"]);
    container.classList.add(styleDescription["expand-container"]);

    // Hides "show more" button
    const showMoreBtn = container.querySelector(`.${styleDescription["show-more-btn"]}`);
    showMoreBtn.classList.remove(styleDescription["display-btn"]);

    // Show "show less" button
    const showLessBtn = container.querySelector(`.${styleDescription["show-less-btn"]}`);
    showLessBtn.classList.add(styleDescription["display-btn"]);

    const sysReqContainer = document.querySelector(`.${styleSystemReq.container}`);
    sysReqContainer.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }

  function handleOnClickShowLess() {
    // Collapse container
    const container = document.querySelector(`.${styleDescription.container}`);
    container.classList.remove(styleDescription["expand-container"]);
    container.classList.add(styleDescription["collapse-container"]);

    // Show "show more" button
    const showMoreBtn = container.querySelector(`.${styleDescription["show-more-btn"]}`);
    showMoreBtn.classList.add(styleDescription["display-btn"]);

    // Hides "show less" button
    const showLessBtn = container.querySelector(`.${styleDescription["show-less-btn"]}`);
    showLessBtn.classList.remove(styleDescription["display-btn"]);
  }
}