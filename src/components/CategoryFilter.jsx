// Category filter dropdown for the products page.
function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      

      <select
        id="category"
        className="category-filter-select"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
      >
        <option value="All">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

     
    </div>
  );
}

export default CategoryFilter;
