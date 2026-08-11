function Filters({ nameFilter, onNameFilterChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Pretraga po imenu"
        value={nameFilter}
        onChange={(event) => onNameFilterChange(event.target.value)}
      />
    </div>
  );
}

export default Filters;
