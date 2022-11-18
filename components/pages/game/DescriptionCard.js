import { Image } from "react-bootstrap";
import descCard from "../../../scss/modules/pages/game/DescriptionCard.module.scss";

export default function DescriptionCard({ coverUrl, description, releaseDate, developer, publisher, genre }) {
  return (
    <div className={descCard.container}>
      <div className={descCard["img-wrapper"]}>
        <Image
          src={coverUrl}
        />
      </div>
      <p>{description}</p>
      <hr />
      <p>
        <strong>Lançamento: </strong>{releaseDate}<br />
        <strong>Desenvolvedor: </strong>{developer}<br />
        <strong>Distribuidor: </strong>{publisher}
      </p>
      <hr />
      <div>
        <h5>CATEGORIA/GÊNERO</h5>
        {genre.map((genre, index) => {
          return (
            <div className={descCard.badge} key={index}>
              {genre.toUpperCase()}
            </div>
          );
        })}
      </div>

    </div>
  );
}