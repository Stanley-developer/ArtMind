// One painting, full details (Feature 6) - Owner: AMANDA

import { useState } from "react";
import { useParams } from "react-router-dom";
import ColourSwatch from "../components/ColourSwatch";
import SimilarPaintings from "../components/SimilarPaintings";
import EmptyState from "../components/EmptyState";
import { pdfDownloadUrl, wordDownloadUrl } from "../api/api";
import { artworks } from "../data/artworks";

const sampleColours = [
  { hex: "#2E4F4F", name: "deep teal", percent: 34 },
  { hex: "#C98B4B", name: "warm amber", percent: 22 },
  { hex: "#D9D2C5", name: "cream", percent: 18 },
  { hex: "#4A6B63", name: "sage", percent: 14 },
  { hex: "#1C2B2B", name: "near black", percent: 12 },
];

function PaintingDetails() {
  const { id } = useParams();

  const [saved, setSaved] = useState(false);

  const painting = artworks.find((item) => item.id === Number(id));

  if (!painting) {
    return (
      <div className="container py-5">
        <EmptyState
          title="Painting not found"
          suggestion="That painting does not exist. Try the gallery instead."
        />
      </div>
    );
  }

  const similar = artworks
    .filter(
      (item) => item.id !== painting.id && item.category === painting.category,
    )
    .slice(0, 6);

  function toggleFavourite() {
    setSaved(!saved);
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-7">
          <div className="hero-frame">
            <img src={painting.image} alt={painting.title} />
          </div>
        </div>

        <div className="col-lg-5">
          <p className="eyebrow">{painting.category}</p>
          <h1 className="detail-title">{painting.title}</h1>
          <p className="detail-artist">{painting.artist}</p>

          <div className="detail-facts">
            <p>
              <span>Category</span> {painting.category}
            </p>
            <p>
              <span>Medium</span> {painting.medium}
            </p>
            <p>
              <span>Surface</span> {painting.surface}
            </p>
            <p>
              <span>Year</span> {painting.year}
            </p>
          </div>
          <h3 className="small-heading">Colours</h3>
          <div className="colour-row">
            {sampleColours.map((colour) => (
              <ColourSwatch
                key={colour.hex}
                hex={colour.hex}
                name={colour.name}
                percent={colour.percent}
              />
            ))}
          </div>

          <div className="ai-summary-box">
            <h3 className="small-heading">AI Summary</h3>
            <p>
              {painting.title} is a {painting.category} painting by{" "}
              {painting.artist}, worked in {painting.medium} on{" "}
              {painting.surface} in {painting.year}.
            </p>
          </div>

          <div className="detail-buttons">
            <button className="btn btn-teal" onClick={toggleFavourite}>
              {saved ? "Saved to Favourites" : "Save to Favourites"}
            </button>

            <a className="btn btn-outline-plain" href={pdfDownloadUrl(id)}>
              Download PDF
            </a>
            <a className="btn btn-outline-plain" href={wordDownloadUrl(id)}>
              Download Word
            </a>
          </div>
        </div>
      </div>

      <SimilarPaintings paintings={similar} />
    </div>
  );
}

export default PaintingDetails;
