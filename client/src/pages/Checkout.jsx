import { useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [deliveryDate, setDeliveryDate] = useState('');
    const [address, setAddress] = useState(user?.address || '');

    const totalMonthlyRent = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const securityDeposit = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * 2), 0); // Assuming 2 months rent as deposit

    const submitHandler = async (e) => {
        e.preventDefault();

        const orderData = {
            products: cartItems.map((item) => ({
                product: item.product,
                quantity: item.quantity,
                tenure: item.tenure,
            })),
            tenure: cartItems[0].tenure, // Simplified: assuming same tenure for all or taking first
            deliveryAddress: address,
            startDate: deliveryDate,
            totalAmount: totalMonthlyRent,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/rentals', orderData, config);
            clearCart();
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        {cartItems.map((item) => (
                            <div key={item.product} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">{item.name} (x{item.quantity})</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{item.price * item.quantity}/mo</dd>
                            </div>
                        ))}
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total Monthly Rent</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{totalMonthlyRent}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Security Deposit (Refundable)</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{securityDeposit}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <form onSubmit={submitHandler} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                    <textarea
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Delivery Date</label>
                    <input
                        type="date"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Confirm Rental
                </button>
            </form>
        </div>
    );
};

export default Checkout;
