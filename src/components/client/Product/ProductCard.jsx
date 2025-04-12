import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PriceTag from './PriceTag';
import RatingStars from './RatingStars';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
            loading="lazy"
          />
          {product.discount && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <RatingStars rating={product.rating} />
            <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
          </div>
          <PriceTag 
            price={product.price} 
            originalPrice={product.originalPrice}
            className="mt-auto"
          />
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;