const Filter = ({ filter, OnFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={OnFilterChange} />
    </div>
  );
};

export default Filter;
