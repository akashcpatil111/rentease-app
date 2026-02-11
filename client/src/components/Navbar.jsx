import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">RentEase</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/catalog" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Catalog
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xs relative">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const query = e.target.search.value;
                                if (query.trim()) {
                                    window.location.href = `/catalog?search=${encodeURIComponent(query)}`;
                                }
                            }}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Search products..."
                                    type="search"
                                />
                            </form>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {(!user || user.role !== 'admin') && (
                            <Link to="/cart" className="p-2 text-gray-400 hover:text-gray-500 relative">
                                <ShoppingCart className="h-6 w-6" />
                                {/* Cart count badge could go here */}
                            </Link>
                        )}

                        {user ? (
                            <div className="ml-3 relative flex items-center space-x-4">
                                <span className="text-gray-700 text-sm">Hello, {user.name}</span>

                                {user.role === 'admin' ? (
                                    <Link to="/admin/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                        My Dashboard
                                    </Link>
                                )}

                                <button onClick={logout} className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
                                    <LogOut className="h-5 w-5 mr-1" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="ml-3 flex items-center space-x-2">
                                <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Log in
                                </Link>
                                <Link to="/register" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
