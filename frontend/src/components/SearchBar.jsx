// The search box - Owner: AMANDA
// The search box - Owner: AMANDA

import { useState } from "react";

// We keep what the user is typing in a piece of state called text, and only
// tell the page about it when they press the button or hit Enter. Searching
// on every single keypress would send far too many requests to the backend.
function SearchBar({ onSearch, placeholder }) {
  const [text, setText] = useState("");

  // A form is used so that pressing Enter works without any extra code.
  // preventDefault stops the browser reloading the page, which is the
  // normal behaviour for a form and would lose everything on screen.
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
