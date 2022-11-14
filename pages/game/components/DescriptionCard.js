import { Image } from "react-bootstrap";
import descCard from "../components/DescriptionCard.module.scss";

export default function DescriptionCard({ coverUrl, description, releaseDate, developer, publisher, genre}) {

  return (
    <div className={descCard.container}>
      <div className={descCard["img-wrapper"]}>
        <Image
          src={coverUrl}
        />
      </div>
      <div className={descCard.text}>
        <p>{description}</p>
        <hr></hr>
        <p>
          <strong>Lançamento: </strong>{releaseDate}<br/>
          <strong>Desenvolvedor: </strong>{developer}<br/>
          <strong>Distribuidor: </strong>{publisher}
        </p>
        <hr></hr>
        <p className={descCard.genre}><strong>CATEGORIA/GÊNERO</strong></p>
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