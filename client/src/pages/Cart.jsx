import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=checkout');
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl text-gray-500">Your cart is empty</p>
                    <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
                        Go back to catalog
                    </Link>
                </div>
            ) : (
                <div className="md:grid md:grid-cols-3 md:gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product} className="flex items-center bg-white p-4 rounded-lg shadow">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-gray-500">₹{item.price}/mo - {item.tenure} Months</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.product, Number(e.target.value))}
                                        className="w-16 border rounded p-1"
                                    />
                                    <button
                                        onClick={() => removeFromCart(item.product)}
                                        className="text-red-600 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 md:mt-0">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                            <div className="mt-4 flex justify-between">
                                <span className="text-gray-600">Total Monthly Rent</span>
                                <span className="font-medium text-gray-900">₹{total}</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Excludes security deposit & delivery charges</p>
                            <button
                                onClick={checkoutHandler}
                                className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
