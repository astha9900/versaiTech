import { useState } from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

const FilterSidebar = ({ 
  categories,
  selectedCategories,
  onCategoryToggle,
  sortOption,
  onSortChange,
  onResetFilters
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      {/* Mobile filter dialog */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md text-sm"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FunnelIcon className="h-5 w-5" />
          Filters
          {selectedCategories.length > 0 && (
            <span className="ml-1 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </button>
      </div>

      {/* Desktop filters */}
      <div className={`${mobileFiltersOpen ? 'fixed' : 'hidden'} lg:block inset-0 z-50 lg:static lg:z-auto`}>
        {/* Overlay */}
        {mobileFiltersOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
        )}

        {/* Sidebar content */}
        <div className="fixed lg:static top-0 left-0 h-full w-80 bg-white p-6 overflow-y-auto z-50 lg:w-full lg:h-auto lg:p-0 lg:bg-transparent">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-lg font-medium">Filters</h2>
            <button onClick={() => setMobileFiltersOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Sort options */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sort by</h3>
            <div className="space-y-2">
              {[
                { value: 'featured', label: 'Featured' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Rating' },
                { value: 'newest', label: 'Newest' }
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`sort-${option.value}`}
                    name="sort-option"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={sortOption === option.value}
                    onChange={() => onSortChange(option.value)}
                  />
                  <label htmlFor={`sort-${option.value}`} className="ml-3 text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedCategories.includes(category)}
                    onChange={() => onCategoryToggle(category)}
                  />
                  <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700 capitalize">
                    {category.replace('-', ' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onResetFilters}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200"
            >
              Reset
            </button>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="lg:hidden flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;