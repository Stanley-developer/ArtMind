// One painting box in the gallery - Owner: AMANDA

import { Link } from "react-router-dom";

function PaintingCard({ id, title, artist, image, tall }) {
  return (
    <Link to={"/painting/" + id} className="painting-card">
      <div
        className={
          tall ? "painting-image painting-image-tall" : "painting-image"
        }
      >
        <img src={image} alt={title} />
      </div>

      <div className="painting-card-body">
        <h3 className="painting-title">{title}</h3>
        <p className="painting-artist">{artist}</p>
      </div>
    </Link>
  );
}

export default PaintingCard;
