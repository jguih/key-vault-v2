import Image from "next/image";
import descCard from "../../../scss/modules/pages/game/DescriptionCard.module.scss";

export default function DescriptionCard({ coverUrl, description, releaseDate, developer, publisher, genreNameArr, alt }) {
  return (
    <div className={descCard.container}>
      <div className={descCard["img-wrapper"]}>
        <Image
          src={coverUrl}
          fill
          priority
          alt={alt}
          sizes="30vw"
        />
      </div>
      {description ? <p>{description}</p> : null}
      <hr />
      <p>
        {releaseDate ? <><strong>Lançamento: </strong>{releaseDate}<br /></> : null}
        {developer ? <><strong>Desenvolvedor: </strong>{developer}<br /></> : null}
        {publisher ? <><strong>Distribuidor: </strong>{publisher}</> : null}
      </p>
      <hr />
      <div>
        {genreNameArr?.length > 0 ? <h5>CATEGORIA/GÊNERO</h5> : null}
        {genreNameArr?.map((genre, index) => {
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