// Smart gallery with filters (Features 3 and 8) - Owner: AMANDA

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MediumFilter from "../components/MediumFilter";
import PaintingGrid from "../components/PaintingGrid";
import { artworks, categories, mediums } from "../data/artworks";

const categoryNames = categories.map((item) => item.name);

function Gallery() {
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [searchText, setSearchText] = useState("");

  let shown = artworks;

  if (category !== "") {
    shown = shown.filter((painting) => painting.category === category);
  }

  if (medium !== "") {
    shown = shown.filter((painting) => painting.medium === medium);
  }

  if (searchText !== "") {
    const lowered = searchText.toLowerCase();
    shown = shown.filter(
      (painting) =>
        painting.title.toLowerCase().includes(lowered) ||
        painting.artist.toLowerCase().includes(lowered),
    );
  }

  function clearFilters() {
    setCategory("");
    setMedium("");
    setSearchText("");
  }

  return (
    <div className="container py-5">
      <p className="eyebrow">The Collection</p>
      <h1 className="page-title">Gallery</h1>

      <div className="row align-items-center g-3 mb-4">
        <div className="col-md-8">
          <SearchBar onSearch={setSearchText} />
        </div>
        <div className="col-md-4">
          <MediumFilter
            mediums={mediums}
            selected={medium}
            onSelect={setMedium}
          />
        </div>
      </div>

      <div className="d-flex align-items-center flex-wrap mb-4">
        <CategoryFilter
          categories={categoryNames}
          selected={category}
          onSelect={setCategory}
        />
        {category || medium || searchText ? (
          <button className="clear-link" onClick={clearFilters}>
            Clear all
          </button>
        ) : null}
      </div>

      <p className="result-count">
        Showing {shown.length} of {artworks.length} paintings
      </p>

      <PaintingGrid
        paintings={shown}
        emptyTitle="No paintings match those filters"
        emptySuggestion="Try a different category, or clear the filters to see everything."
      />
    </div>
  );
}

export default Gallery;
