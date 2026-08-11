function Filters({
  nameFilter,
  onNameFilterChange,
  typeFilter,
  onTypeFilterChange,
  userTypes,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Pretraga po imenu"
        value={nameFilter}
        onChange={(event) => onNameFilterChange(event.target.value)}
      />
      <select
        value={typeFilter}
        onChange={(event) => onTypeFilterChange(event.target.value)}
      >
        <option value="">Svi tipovi</option>
        {userTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
