export function GearCategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="gear-category-filter" aria-label="Filter gear by category">
      {['All gear', ...categories].map((category) => (
        <button
          className={selectedCategory === category ? 'gear-category is-active' : 'gear-category'}
          key={category}
          type="button"
          aria-pressed={selectedCategory === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
