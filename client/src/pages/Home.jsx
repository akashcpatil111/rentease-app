import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-indigo-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Modern living room"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                        Rent Smarter, Live Better
                    </h1>
                    <p className="mt-4 text-xl text-indigo-100 max-w-3xl">
                        Upgrade your home with premium furniture and appliances without the heavy upfront cost.
                        Flexible tenure, free delivery, and zero hassle.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link
                            to="/catalog"
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg flex items-center"
                        >
                            Explore Catalog <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            to={user ? "/catalog" : "/register"}
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Why Choose RentEase?</h2>
                        <p className="mt-4 text-lg text-gray-500">We make renting easy, affordable, and convenient.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                            <p className="text-gray-600">Every item is quality checked and sanitized before delivery. Brand new or like-new condition guaranteed.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                                    <Truck className="w-8 h-8" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Free Delivery & Setup</h3>
                            <p className="text-gray-600">We deliver, install, and set up everything for free. You just sit back and relax.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                                    <Clock className="w-8 h-8" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Tenure</h3>
                            <p className="text-gray-600">Rent for 3, 6, 9, or 12 months. Extend or close your subscription anytime with ease.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Browse by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Link to="/catalog?category=Furniture" className="group relative rounded-lg overflow-hidden h-64 shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Furniture"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-30">
                                <h3 className="text-3xl font-bold text-white">Furniture</h3>
                            </div>
                        </Link>
                        <Link to="/catalog?category=Appliances" className="group relative rounded-lg overflow-hidden h-64 shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Appliances"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-30">
                                <h3 className="text-3xl font-bold text-white">Appliances</h3>
                            </div>
                        </Link>
                        <Link to="/catalog?category=Packages" className="group relative rounded-lg overflow-hidden h-64 shadow-lg md:col-span-2 lg:col-span-1">
                            <img
                                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Packages"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-30">
                                <h3 className="text-3xl font-bold text-white">Packages</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-600">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to get started?</span>
                        <span className="block text-indigo-200">Create an account today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
