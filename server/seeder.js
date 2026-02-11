const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env');
        }
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected. Clearing data...');
        await User.deleteMany();
        await Product.deleteMany();
        console.log('Data cleared. Seeding users...');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword, // 123456
                role: 'admin',
                phone: '1234567890',
                address: 'Admin HQ',
            },
            {
                name: 'John Doe',
                email: 'user@example.com',
                password: hashedPassword, // 123456
                role: 'user',
                phone: '0987654321',
                address: '123 Main St',
            },
        ];

        await User.insertMany(users);

        console.log('Data Imported! Admin: admin@example.com / 123456');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
