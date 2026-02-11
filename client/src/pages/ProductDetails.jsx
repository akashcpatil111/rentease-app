import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [tenure, setTenure] = useState(3);
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, Number(quantity), Number(tenure));
        navigate('/cart');
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="md:flex md:items-start">
                <div className="md:w-1/2 relative">
                    <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100 mb-4">
                        <img
                            className="w-full h-96 object-contain"
                            src={product.images[currentImageIndex]}
                            alt={`${product.name} - View ${currentImageIndex + 1}`}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                        />
                    </div>
                    {product.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                            >
                                &#10094;
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                            >
                                &#10095;
                            </button>
                            <div className="flex justify-center space-x-2 mt-2">
                                {product.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-3 h-3 rounded-full focus:outline-none ${currentImageIndex === idx ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="md:w-1/2 md:ml-8 mt-6 md:mt-0">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="mt-2 text-gray-500">{product.category} - {product.subCategory}</p>
                    <div className="mt-4">
                        <span className="text-2xl font-bold text-indigo-600">₹{product.pricePerMonth}/mo</span>
                        <span className="ml-2 text-sm text-gray-500">Security Deposit: ₹{product.securityDeposit}</span>
                    </div>
                    <p className="mt-4 text-gray-700">{product.description}</p>

                    <div className="mt-6 flex space-x-4">
                        {(!user || user.role !== 'admin') && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stock}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="mt-1 block w-20 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tenure: <span className="text-indigo-600 font-bold">{tenure} Months</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="3"
                                        max="12"
                                        step="3"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>3 Mo</span>
                                        <span>6 Mo</span>
                                        <span>9 Mo</span>
                                        <span>12 Mo</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {user && user.role === 'admin' ? (
                        <div className="mt-8">
                            <button
                                onClick={() => navigate('/admin/dashboard')}
                                className="w-full bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Manage in Admin Dashboard
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!product.isAvailable || product.stock === 0}
                        >
                            {product.isAvailable && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    )}
                </div>
            </div>
            {product && <SimilarProducts category={product.category} currentProductId={product._id} />}
        </div>
    );
};

const SimilarProducts = ({ category, currentProductId }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                const similar = data
                    .filter(p => p.category === category && p._id !== currentProductId)
                    .slice(0, 3);
                setProducts(similar);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSimilar();
    }, [category, currentProductId]);

    if (products.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200">
                        <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-60">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                            />
                        </div>
                        <div className="flex-1 p-4 space-y-2 flex flex-col">
                            <h3 className="text-lg font-medium text-gray-900">
                                <span aria-hidden="true" className="absolute inset-0" onClick={() => navigate(`/product/${product._id}`)} />
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 flex-1">{product.description.substring(0, 60)}...</p>
                            <div className="flex items-center justify-between pt-2">
                                <p className="text-xl font-bold text-indigo-600">₹{product.pricePerMonth}/mo</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
