import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Wrench, X } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Maintenance Modal State
    const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
    const [selectedRental, setSelectedRental] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [issueDescription, setIssueDescription] = useState('');

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/rentals/myrentals', config);
                setRentals(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchRentals();
        }
    }, [user]);

    const openMaintenanceModal = (rentalId, productId, productName) => {
        setSelectedRental(rentalId);
        setSelectedProduct({ id: productId, name: productName });
        setShowMaintenanceModal(true);
    };

    const closeMaintenanceModal = () => {
        setShowMaintenanceModal(false);
        setSelectedRental(null);
        setSelectedProduct(null);
        setIssueDescription('');
    };

    const submitMaintenanceRequest = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post('http://localhost:5000/api/maintenance', {
                rental: selectedRental,
                product: selectedProduct.id,
                issueDescription
            }, config);
            alert('Maintenance request submitted successfully!');
            closeMaintenanceModal();
        } catch (error) {
            console.error(error);
            alert('Failed to submit request');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Rentals</h1>
            {rentals.length === 0 ? (
                <p>No active rentals found.</p>
            ) : (
                <div className="space-y-6">
                    {rentals.map((rental) => (
                        <div key={rental._id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Rental #{rental._id.substring(0, 8)}</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Placed on {new Date(rental.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rental.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {rental.status}
                                </span>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Products</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul className="list-disc pl-5">
                                                {rental.products.map((item) => (
                                                    <li key={item._id} className="flex justify-between items-center mb-2">
                                                        <span>{item.product.name} (x{item.quantity}) - {item.tenure} Months</span>
                                                        {rental.status === 'Active' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => openMaintenanceModal(rental._id, item.product._id, item.product.name)}
                                                                    className="ml-4 flex items-center text-xs text-orange-600 hover:text-orange-800 border border-orange-200 rounded px-2 py-1"
                                                                >
                                                                    <Wrench className="w-3 h-3 mr-1" /> Report Issue
                                                                </button>
                                                                <button
                                                                    onClick={async () => {
                                                                        if (window.confirm('Request early return for this item?')) {
                                                                            try {
                                                                                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                                                                                await axios.put(`http://localhost:5000/api/rentals/${rental._id}/return`, {}, config);
                                                                                const { data } = await axios.get('http://localhost:5000/api/rentals/myrentals', config);
                                                                                setRentals(data);
                                                                            } catch (error) {
                                                                                alert('Failed to request return');
                                                                            }
                                                                        }
                                                                    }}
                                                                    className="ml-2 text-xs text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded px-2 py-1"
                                                                >
                                                                    Request Return
                                                                </button>
                                                            </>
                                                        ) : rental.status === 'Return Requested' ? (
                                                            <span className="ml-4 text-xs text-indigo-500 font-medium">Return Requested</span>
                                                        ) : rental.status === 'Pending' ? (
                                                            <span className="ml-4 text-xs text-gray-400 italic flex items-center">
                                                                <Wrench className="w-3 h-3 mr-1 opacity-50" /> Activation required
                                                            </span>
                                                        ) : rental.status === 'Return Requested' ? (
                                                            <span className="ml-4 text-xs text-indigo-500 font-medium">Return Requested</span>
                                                        ) : null}
                                                    </li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Dates</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Total Monthly Rent</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{rental.totalAmount}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Maintenance Request Modal */}
            {showMaintenanceModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                        <button onClick={closeMaintenanceModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Report Issue for {selectedProduct?.name}</h3>
                        <form onSubmit={submitMaintenanceRequest}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Describe the Issue</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Please describe the problem in detail..."
                                    required
                                    value={issueDescription}
                                    onChange={(e) => setIssueDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closeMaintenanceModal} className="mr-3 px-4 py-2 text-gray-700 hover:text-gray-900">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
