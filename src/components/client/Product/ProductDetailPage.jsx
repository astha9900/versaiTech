import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PriceTag from './PriceTag';
import RatingStars from './RatingStars';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      if (foundProduct) {
        setSelectedImage(foundProduct.images?.[0] || foundProduct.image);
        setSelectedColor(foundProduct.colors?.[0] || '');
        setSelectedSize(foundProduct.sizes?.[0] || '');
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-2">Product not found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Image gallery */}
        <div className="mb-8 lg:mb-0">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((image, index) => (
              <button
                key={index}
                className={`aspect-square bg-gray-100 rounded overflow-hidden ${selectedImage === image ? 'ring-2 ring-indigo-500' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <RatingStars rating={product.rating} />
            <span className="text-gray-500 text-sm ml-1">({product.reviewCount} reviews)</span>
            {product.stock && (
              <span className="ml-4 text-sm text-green-600">In Stock</span>
            )}
          </div>

          <div className="mb-6">
            <PriceTag 
              price={product.price} 
              originalPrice={product.originalPrice} 
              discount={product.discount}
              large
            />
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Variant selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${selectedColor === color ? 'border-indigo-500' : 'border-transparent'}`}
                    style={{ backgroundColor: getColorHex(color) }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`py-2 px-3 border rounded-md text-sm font-medium ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and add to cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md text-base font-medium hover:bg-indigo-700"
            >
              Add to cart
            </button>
          </div>

          {/* Product details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Details</h3>
            <div className="space-y-3">
              {product.details?.map((detail, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 w-24 flex-shrink-0">{detail.name}:</span>
                  <span className="text-gray-900">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for color display
const getColorHex = (color) => {
  const colors = {
    black: '#000000',
    white: '#ffffff',
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#10b981',
    gray: '#6b7280',
    silver: '#c0c0c0'
  };
  return colors[color.toLowerCase()] || colors.gray;
};

// Mock data would be imported from a separate file
// Replace the placeholder with this complete mock data array
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
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design'
    ],
    colors: ['black', 'silver', 'blue'],
    sizes: ['One Size'],
    stock: true,
    details: [
      { name: 'Brand', value: 'AudioMaster' },
      { name: 'Model', value: 'AM-WH300' },
      { name: 'Connectivity', value: 'Bluetooth 5.0' },
      { name: 'Battery', value: '30 hours' }
    ]
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    rating: 4.2,
    reviewCount: 56,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Soft organic cotton t-shirt made from 100% certified organic materials. Comfortable fit for everyday wear.',
    colors: ['white', 'black', 'gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: true,
    details: [
      { name: 'Material', value: '100% Organic Cotton' },
      { name: 'Fit', value: 'Regular' },
      { name: 'Care', value: 'Machine wash cold' }
    ]
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
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      
    ],
    description: 'Insulated stainless steel bottle keeps drinks cold for 24 hours or hot for 12 hours.',
    features: [
      '24-hour cold retention',
      'Leak-proof lid',
      'BPA-free materials'
    ],
    colors: ['silver', 'black', 'blue'],
    sizes: ['500ml', '750ml'],
    stock: true
  },
  {
    id: 6,
    name: 'Yoga Mat (6mm Thick)',
    price: 34.99,
    rating: 4.5,
    reviewCount: 89,
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&w=800&h=800&fit=crop'
    ],
    description: 'Eco-friendly non-slip yoga mat with carrying strap.',
    features: ['Non-toxic materials', 'Lightweight', 'Easy to clean'],
    colors: ['purple', 'teal', 'charcoal'],
    sizes: ['Standard (68" x 24")'],
    stock: true
  },
  {
    id: 4,
    name: 'Wireless Charging Stand',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.2,
    reviewCount: 67,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&w=300&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&w=800&h=800&fit=crop'
    ],
    description: '15W fast charging stand compatible with Qi-enabled devices.',
    features: ['LED charging indicator', 'Non-slip base', 'Overheat protection'],
    colors: ['white', 'black'],
    stock: true
  },
  {
    id: 5,
    name: 'Leather Wallet with RFID Protection',
    price: 49.99,
    originalPrice: 59.99,
    discount: 17,
    rating: 4.6,
    reviewCount: 143,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&w=300&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&w=800&h=800&fit=crop'
    ],
    description: 'Genuine leather wallet with 8 card slots and RFID blocking technology.',
    features: ['Hand-stitched', 'Money clip', 'ID window'],
    colors: ['brown', 'black'],
    stock: true
  }
];

export default ProductDetailPage; 
