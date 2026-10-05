// The search box - Owner: AMANDA

import { useState } from "react";
function SearchBar({ onSearch, placeholder }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(text);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control search-input"
        placeholder={placeholder || "Try: find nature oil paintings"}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <button type="submit" className="btn btn-teal">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
