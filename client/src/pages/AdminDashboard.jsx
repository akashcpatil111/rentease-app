import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Plus, Trash2, CheckCircle, XCircle, Edit } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'maintenance'
    const [products, setProducts] = useState([]);
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);

    // New Product Form State
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '', category: 'Furniture', subCategory: '', pricePerMonth: '', securityDeposit: '', images: '', description: '', stock: ''
    });

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };

            if (activeTab === 'inventory') {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } else if (activeTab === 'maintenance') {
                const { data } = await axios.get('http://localhost:5000/api/maintenance', config);
                setMaintenanceRequests(data);
            } else if (activeTab === 'rentals') {
                const { data } = await axios.get('http://localhost:5000/api/rentals', config);
                setRentals(data);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            // Split images string into array
            const productData = { ...newProduct, images: newProduct.images.split(',').map(url => url.trim()) };

            await axios.post('http://localhost:5000/api/products', productData, config);
            setShowAddProduct(false);
            setNewProduct({ name: '', category: 'Furniture', subCategory: '', pricePerMonth: '', securityDeposit: '', images: '', description: '', stock: '' });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleBulkUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const products = JSON.parse(event.target.result);
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.post('http://localhost:5000/api/products/bulk', products, config);
                alert('Bulk upload successful!');
                fetchData();
            } catch (error) {
                console.error(error);
                alert('Failed to upload products. Ensure JSON format is correct.');
            }
        };
        reader.readAsText(file);
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/maintenance/${id}/status`, { status }, config);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    const handlerentalStatusUpdate = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/rentals/${id}/status`, { status }, config);
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Failed to update rental status');
        }
    };

    const handleEditClick = (product) => {
        // Convert array of images back to comma separated string for editing
        setEditingProduct({
            ...product,
            images: product.images.join(', ')
        });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            // Process images back to array
            const productData = {
                ...editingProduct,
                images: editingProduct.images.split(',').map(url => url.trim())
            };

            await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, productData, config);
            setEditingProduct(null);
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Failed to update product');
        }
    };

    if (!user || user.role !== 'admin') return <div className="p-8">Access Denied. Admin only.</div>;

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-md ${activeTab === 'inventory' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => setActiveTab('inventory')}
                >
                    Inventory Management
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${activeTab === 'maintenance' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => setActiveTab('maintenance')}
                >
                    Maintenance Requests
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${activeTab === 'rentals' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => setActiveTab('rentals')}
                >
                    Rentals
                </button>
            </div>

            {activeTab === 'inventory' && (
                <>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="flex justify-between items-center px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Inventory</h3>
                            <div className="flex space-x-2">
                                <label className="flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 cursor-pointer">
                                    <span>Bulk Upload</span>
                                    <input type="file" accept=".json" onChange={handleBulkUpload} className="hidden" />
                                </label>
                                <button
                                    onClick={() => setShowAddProduct(!showAddProduct)}
                                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Add New Product
                                </button>
                            </div>
                        </div>
                    </div>

                    {showAddProduct && (
                        <div className="bg-white p-6 rounded-lg shadow mb-6">
                            <h3 className="text-lg font-medium mb-4">Add New Product</h3>
                            <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" required className="border p-2 rounded" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                                <select className="border p-2 rounded" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Appliances">Appliances</option>
                                </select>
                                <input type="text" placeholder="Sub Category" required className="border p-2 rounded" value={newProduct.subCategory} onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })} />
                                <input type="number" placeholder="Price Per Month" required className="border p-2 rounded" value={newProduct.pricePerMonth} onChange={(e) => setNewProduct({ ...newProduct, pricePerMonth: e.target.value })} />
                                <input type="number" placeholder="Security Deposit" required className="border p-2 rounded" value={newProduct.securityDeposit} onChange={(e) => setNewProduct({ ...newProduct, securityDeposit: e.target.value })} />
                                <input type="number" placeholder="Stock" required className="border p-2 rounded" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                                <input type="text" placeholder="Image URLs (comma separated)" required className="border p-2 rounded md:col-span-2" value={newProduct.images} onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })} />
                                <textarea placeholder="Description" required className="border p-2 rounded md:col-span-2" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                                <div className="md:col-span-2 flex justify-end">
                                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Create Product</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <li key={product._id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded object-cover mr-4" />
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 truncate">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.category} - Stock: {product.stock}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:text-blue-900">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {editingProduct && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Edit Product</h3>
                                    <button onClick={() => setEditingProduct(null)} className="text-gray-500 hover:text-gray-700">
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>
                                <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" required className="border p-2 rounded" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                                    <select className="border p-2 rounded" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Appliances">Appliances</option>
                                    </select>
                                    <input type="text" placeholder="Sub Category" required className="border p-2 rounded" value={editingProduct.subCategory} onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })} />
                                    <input type="number" placeholder="Price Per Month" required className="border p-2 rounded" value={editingProduct.pricePerMonth} onChange={(e) => setEditingProduct({ ...editingProduct, pricePerMonth: e.target.value })} />
                                    <input type="number" placeholder="Security Deposit" required className="border p-2 rounded" value={editingProduct.securityDeposit} onChange={(e) => setEditingProduct({ ...editingProduct, securityDeposit: e.target.value })} />
                                    <input type="number" placeholder="Stock" required className="border p-2 rounded" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} />
                                    <input type="text" placeholder="Image URLs (comma separated)" required className="border p-2 rounded md:col-span-2" value={editingProduct.images} onChange={(e) => setEditingProduct({ ...editingProduct, images: e.target.value })} />
                                    <textarea placeholder="Description" required className="border p-2 rounded md:col-span-2" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />

                                    <div className="md:col-span-2 flex justify-end space-x-3">
                                        <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}

            {activeTab === 'maintenance' && (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {maintenanceRequests.length === 0 ? <p className="p-4">No maintenance requests.</p> : (
                        <ul className="divide-y divide-gray-200">
                            {maintenanceRequests.map((req) => (
                                <li key={req._id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600">REQ ID: {req._id}</p>
                                            <p className="text-sm text-gray-500">Issue: {req.issueDescription}</p>
                                            <p className="text-xs text-gray-400">User: {req.user?.name || 'Unknown'} | Product: {req.product?.name || 'Unknown'}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                req.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {req.status}
                                            </span>
                                            {req.status !== 'Resolved' && (
                                                <button onClick={() => handleUpdateStatus(req._id, 'Resolved')} className="text-green-600 p-1" title="Mark Resolved">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {req.status === 'Pending' && (
                                                <button onClick={() => handleUpdateStatus(req._id, 'In Progress')} className="text-blue-600 p-1" title="Mark In Progress">
                                                    Process
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {activeTab === 'rentals' && (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {rentals.length === 0 ? <p className="p-4">No active rentals found.</p> : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rentals.map((rental) => (
                                        <tr key={rental._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{rental._id.substring(0, 8)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rental.user ? rental.user.name : 'Unknown User'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <ul className="list-disc pl-4">
                                                    {rental.products.map(p => (
                                                        <li key={p._id}>{p.product ? p.product.name : 'Deleted Product'} (x{p.quantity})</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{rental.totalAmount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rental.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    rental.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                                                        rental.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {rental.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {rental.status === 'Pending' && (
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handlerentalStatusUpdate(rental._id, 'Active')}
                                                            className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handlerentalStatusUpdate(rental._id, 'Cancelled')}
                                                            className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                                {rental.status === 'Active' && (
                                                    <button
                                                        onClick={() => handlerentalStatusUpdate(rental._id, 'Completed')}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Mark Completed
                                                    </button>
                                                )}
                                                {rental.status === 'Return Requested' && (
                                                    <button
                                                        onClick={() => handlerentalStatusUpdate(rental._id, 'Completed')}
                                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded"
                                                    >
                                                        Approve Return
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
