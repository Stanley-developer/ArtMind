// The six category buttons - Owner: AMANDA

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="filter-row">
      <button
        className={selected ? "filter-pill" : "filter-pill filter-pill-active"}
        onClick={() => onSelect("")}
      >
        All
      </button>

      {categories.map((name) => (
        <button
          key={name}
          className={
            selected === name ? "filter-pill filter-pill-active" : "filter-pill"
          }
          onClick={() => onSelect(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
