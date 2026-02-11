import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={product.name}
                loading="lazy"
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category} - {product.subCategory}</p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-indigo-600 font-bold">₹{product.pricePerMonth}/mo</span>
                    <Link
                        to={`/product/${product._id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
