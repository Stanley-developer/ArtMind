// Similar paintings strip - Owner: AMANDA

import PaintingCard from "./PaintingCard";

function SimilarPaintings({ paintings, title }) {
  if (!paintings || paintings.length === 0) {
    return null;
  }

  return (
    <section className="py-5">
      <h2 className="section-title">{title || "Similar paintings"}</h2>

      <div className="row g-4">
        {paintings.map((painting) => (
          <div className="col-6 col-md-2" key={painting.id}>
            <PaintingCard
              id={painting.id}
              title={painting.title}
              artist={painting.artist}
              image={painting.image_url || painting.image}
            />
            {painting.similarity ? (
              <p className="similarity-score">
                {Math.round(painting.similarity * 100)}% match
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SimilarPaintings;
