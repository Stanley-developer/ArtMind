// Rows of painting cards - Owner: AMANDA

import PaintingCard from "./PaintingCard";
import EmptyState from "./EmptyState";

function PaintingGrid({ paintings, emptyTitle, emptySuggestion }) {
  if (!paintings || paintings.length === 0) {
    return <EmptyState title={emptyTitle} suggestion={emptySuggestion} />;
  }

  return (
    <div className="row g-4">
      {paintings.map((painting) => (
        <div className="col-6 col-md-3" key={painting.id}>
          <PaintingCard
            id={painting.id}
            title={painting.title}
            artist={painting.artist}
            image={painting.image_url || painting.image}
          />
        </div>
      ))}
    </div>
  );
}

export default PaintingGrid;
