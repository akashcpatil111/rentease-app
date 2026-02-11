const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkUsers = async () => {
    try {
        console.log('Connecting to URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- ${u.email} (Role: ${u.role})`);
        });

        if (users.length === 0) {
            console.log('No users found. Creating admin...');
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('123456', salt);
            await User.create({
                name: 'Admin Debug',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
                phone: '0000000000',
                address: 'Debug Address'
            });
            console.log('Admin created: admin@example.com / 123456');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
