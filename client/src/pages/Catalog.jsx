import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search');
        const categoryParam = params.get('category');

        if (searchParam) setSearchTerm(searchParam);
        if (categoryParam) setCategory(categoryParam);
    }, [location.search]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                console.log('Fetched Products:', data);
                setProducts(data);

                // Initialize filters from URL params
                const params = new URLSearchParams(window.location.search);
                const searchParam = params.get('search');
                const categoryParam = params.get('category');

                if (searchParam) setSearchTerm(searchParam);
                if (categoryParam) setCategory(categoryParam);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (category !== 'All') {
            result = result.filter((product) => product.category === category);
        }

        if (searchTerm) {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        console.log('Filtered Results:', result);
        setFilteredProducts(result);
    }, [category, searchTerm, products]);

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Product Catalog</h1>

                <div className="flex space-x-4">


                    <select
                        className="px-4 py-2 border rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Appliances">Appliances</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading catalog...</p>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setCategory('All'); }}
                        className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Catalog;
