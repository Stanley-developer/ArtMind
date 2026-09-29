// Shows one colour square with its name - Owner: AMANDA

function ColourSwatch({ hex, name, percent }) {
  return (
    <div className="colour-swatch">
      <div className="colour-swatch-box" style={{ backgroundColor: hex }}></div>
      <p className="colour-swatch-name">{name}</p>
      {percent ? (
        <p className="colour-swatch-percent">{Math.round(percent)}%</p>
      ) : null}
    </div>
  );
}

export default ColourSwatch;
