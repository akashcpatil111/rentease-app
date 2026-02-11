const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Rental = require('./models/Rental');
const MaintenanceRequest = require('./models/MaintenanceRequest');
const connectDB = require('./config/db');

dotenv.config();

const fs = require('fs');

const viewDbContent = async () => {
    try {
        await connectDB();
        let output = '\n--- DATABASE CONTENT ---\n';

        const users = await User.find({}).select('-password');
        output += `\n[USERS] Count: ${users.length}\n`;
        output += JSON.stringify(users, null, 2);

        const products = await Product.find({});
        output += `\n\n[PRODUCTS] Count: ${products.length}\n`;
        output += JSON.stringify(products, null, 2);

        const rentals = await Rental.find({});
        output += `\n\n[RENTALS] Count: ${rentals.length}\n`;
        output += JSON.stringify(rentals, null, 2);

        const maintenanceRequests = await MaintenanceRequest.find({});
        output += `\n\n[MAINTENANCE REQUESTS] Count: ${maintenanceRequests.length}\n`;
        output += JSON.stringify(maintenanceRequests, null, 2);

        output += '\n------------------------\n';

        fs.writeFileSync('db_content.txt', output);
        console.log('Database content written to db_content.txt');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

viewDbContent();
