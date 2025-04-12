import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import FilterSidebar from './FilterSidebar'

// Mock data - in a real app this would come from an API
const mockProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 128,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    rating: 4.2,
    reviewCount: 56,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    name: 'Stainless Steel Water Bottle',
    price: 24.95,
    originalPrice: 34.95,
    discount: 29,
    rating: 4.8,
    reviewCount: 212,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    price: 39.99,
    rating: 3.9,
    reviewCount: 87,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 5,
    name: 'Leather Wallet',
    price: 49.99,
    originalPrice: 59.99,
    discount: 17,
    rating: 4.7,
    reviewCount: 143,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 6,
    name: 'Yoga Mat',
    price: 34.99,
    rating: 4.3,
    reviewCount: 92,
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
]

// Extract unique categories from products
const allCategories = [...new Set(mockProducts.map(product => product.category))]

const ProductListPage = () => {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortOption, setSortOption] = useState('featured')

  // Apply filters and sorting whenever they change
  useEffect(() => {
    let result = [...products]
    
    // Apply category filters
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category))
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // Assuming newer products have higher IDs
        result.sort((a, b) => b.id - a.id)
        break
      default:
        // 'featured' - keep original order
        break
    }
    
    setFilteredProducts(result)
  }, [selectedCategories, sortOption, products])

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    )
  }

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSortOption('featured')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Our Products</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4">
          <FilterSidebar
            categories={allCategories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            onResetFilters={handleResetFilters}
          />
        </div>
        
        {/* Product grid */}
        <div className="lg:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductListPage