// {/*For searching products, accepts some input text*/}


function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by product name or SKU..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      {searchTerm && (
        <button onClick={() => onSearchChange("")}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;