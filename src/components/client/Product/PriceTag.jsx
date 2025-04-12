const PriceTag = ({ price, originalPrice, discount }) => {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">₹{price.toFixed(2)}</span>
        {originalPrice && (
          <span className="text-gray-500 line-through text-sm">₹{originalPrice.toFixed(2)}</span>
        )}
        {discount && (
          <span className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
            {discount}% OFF
          </span>
        )}
      </div>
    )
  }
  
  export default PriceTag