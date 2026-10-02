// Oil, watercolour, canvas dropdown - Owner: AMANDA

function MediumFilter({ mediums, selected, onSelect }) {
  return (
    <select
      className="form-select medium-select"
      value={selected}
      onChange={(event) => onSelect(event.target.value)}
    >
      <option value="">All mediums</option>

      {mediums.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default MediumFilter;
