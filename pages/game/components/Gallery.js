import gallery from "./Gallery.module.scss";
import { Image } from "react-bootstrap";

export default function Gallery() {
  return (
    <div className={gallery.container}>
      <div className={gallery["gallery-img"]}>
        <Image
          src="https://images.igdb.com/igdb/image/upload/t_original/ar7dp.jpg"
        />
      </div>
      <div className={gallery.slider}>
        <div className={gallery["slider-img"]}>
          <Image 
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5jf5.png"
          />
        </div>
        <div className={gallery["slider-img"]}>
          <Image 
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5jf5.png"
          />
        </div>
        <div className={gallery["slider-img"]}>
          <Image 
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5jf5.png"
          />
        </div>
        <div className={gallery["slider-img"]}>
          <Image 
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5jf5.png"
          />
        </div>
        <div className={gallery["slider-img"]}>
          <Image 
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5jf5.png"
          />
        </div>
        <div className={gallery["slider-img"]}>
          <Image 
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5jf5.png"
          />
        </div>
      </div>  
    </div>
  );
}