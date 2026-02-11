const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Define products array globally or pass it in
const products = [
    // --- FURNITURE ---
    // Living Room
    {
        name: 'Velvet 3-Seater Sofa',
        description: 'Luxurious crushed velvet sofa in navy blue. Perfect for modern living rooms.',
        category: 'Furniture',
        subCategory: 'Living Room',
        pricePerMonth: 1200,
        securityDeposit: 3000,
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 5,
        isAvailable: true
    },
    {
        name: 'Mid-Century Modern Armchair',
        description: 'Classic mid-century design with teak wood legs and grey upholstery.',
        category: 'Furniture',
        subCategory: 'Living Room',
        pricePerMonth: 600,
        securityDeposit: 1500,
        images: ['https://plus.unsplash.com/premium_photo-1705169612261-2cf0407141c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWlkJTIwY2VudHVyeSUyMG1vZGVybiUyMGFybWNoYWlyfGVufDB8fDB8fHww'],
        stock: 8,
        isAvailable: true
    },
    {
        name: 'Industrial Coffee Table',
        description: 'Reclaimed wood top with black metal hairpin legs.',
        category: 'Furniture',
        subCategory: 'Living Room',
        pricePerMonth: 350,
        securityDeposit: 1000,
        images: ['https://images.unsplash.com/photo-1550260817-4a8de8303baa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kdXN0cmlhbCUyMGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fHww'],
        stock: 10,
        isAvailable: true
    },
    {
        name: 'Leather Recliner',
        description: 'Premium faux leather recliner with lumbar support.',
        category: 'Furniture',
        subCategory: 'Living Room',
        pricePerMonth: 900,
        securityDeposit: 2500,
        images: ['https://media.istockphoto.com/id/1255661370/photo/recliner.webp?a=1&b=1&s=612x612&w=0&k=20&c=RX2k4JCL41IS5pkl21BW6_DoklL-YAIp1B8TSBJIMO0='],
        stock: 3,
        isAvailable: true
    },
    {
        name: 'L-Shaped Sectional Sofa',
        description: 'Spacious fabric sectional, seats 5 comfortably. Light grey.',
        category: 'Furniture',
        subCategory: 'Living Room',
        pricePerMonth: 1500,
        securityDeposit: 4000,
        images: ['https://images.unsplash.com/photo-1759722665621-7ae933accb69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGwlMjBzaGFwZWQlMjBzZWN0aW9uYWwlMjBzb2ZhfGVufDB8fDB8fHww'],
        stock: 4,
        isAvailable: true
    },
    {
        name: 'Wooden TV Unit',
        description: 'Solid sheesham wood TV console with ample storage.',
        category: 'Furniture',
        subCategory: 'Living Room',
        pricePerMonth: 450,
        securityDeposit: 1200,
        images: ['https://images.unsplash.com/photo-1637747022694-92c8cbc90a38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvb2RlbiUyMHR2JTIwdW5pdHxlbnwwfHwwfHx8MA%3D%3D'],
        stock: 7,
        isAvailable: true
    },
    {
        name: 'Bean Bag (XXL)',
        description: 'Comfortable oversized bean bag in faux leather. Black.',
        category: 'Furniture',
        subCategory: 'Living Room',
        pricePerMonth: 200,
        securityDeposit: 500,
        images: ['https://plus.unsplash.com/premium_photo-1724155541101-6eb87b91f993?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGJlYW4lMjBiYWd8ZW58MHx8MHx8fDA%3D'],
        stock: 15,
        isAvailable: true
    },

    // Bedroom
    {
        name: 'Queen Size Bed (Solid Wood)',
        description: 'Sturdy queen size bed with teak finish. Mattress included.',
        category: 'Furniture',
        subCategory: 'Bedroom',
        pricePerMonth: 900,
        securityDeposit: 2500,
        images: ['https://images.unsplash.com/photo-1560185128-e173042f79dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cXVlZW4lMjBzaXplJTIwYmVkfGVufDB8fDB8fHww'],
        stock: 6,
        isAvailable: true
    },
    {
        name: 'Orthopedic Mattress (Queen)',
        description: '6-inch memory foam orthopedic mattress for back support.',
        category: 'Furniture',
        subCategory: 'Bedroom',
        pricePerMonth: 400,
        securityDeposit: 1000,
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 10,
        isAvailable: true
    },
    {
        name: 'Bedside Table',
        description: 'Minimalist wooden bedside table with one drawer.',
        category: 'Furniture',
        subCategory: 'Bedroom',
        pricePerMonth: 150,
        securityDeposit: 400,
        images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 12,
        isAvailable: true
    },
    {
        name: 'Single Bed (Metal)',
        description: 'Durable metal single bed, perfect for students or guest rooms.',
        category: 'Furniture',
        subCategory: 'Bedroom',
        pricePerMonth: 500,
        securityDeposit: 1200,
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 8,
        isAvailable: true
    },
    {
        name: 'Wardrobe (2-Door)',
        description: 'Spacious 2-door wardrobe with hanging rod and shelves.',
        category: 'Furniture',
        subCategory: 'Bedroom',
        pricePerMonth: 700,
        securityDeposit: 1800,
        images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 5,
        isAvailable: true
    },
    {
        name: 'Dressing Table',
        description: 'Modern dressing table with full-length mirror and storage.',
        category: 'Furniture',
        subCategory: 'Bedroom',
        pricePerMonth: 450,
        securityDeposit: 1200,
        images: ['https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 4,
        isAvailable: true
    },

    // Dining
    {
        name: 'Wooden Dining Table (4 Seater)',
        description: 'Classic wooden dining table with 4 cushioned chairs.',
        category: 'Furniture',
        subCategory: 'Dining',
        pricePerMonth: 950,
        securityDeposit: 2500,
        images: ['https://images.unsplash.com/photo-1682142883050-0d28b61feac9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fDQlMjBzZWF0ZXIlMjB3b29kZW4lMjBkaW5pbmclMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D'],
        stock: 4,
        isAvailable: true
    },
    {
        name: 'Glass Top Dining Table (6 Seater)',
        description: 'Elegant glass top table with metal legs and 6 chairs.',
        category: 'Furniture',
        subCategory: 'Dining',
        pricePerMonth: 1400,
        securityDeposit: 3500,
        images: ['https://plus.unsplash.com/premium_photo-1669648746595-f0eb67908d73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fDYlMjBzZWF0ZXIlMjBkaW5pbmclMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D'],
        stock: 2,
        isAvailable: true
    },

    // Study
    {
        name: 'Ergonomic Office Chair',
        description: 'Mesh back office chair with adjustable height and lumbar support.',
        category: 'Furniture',
        subCategory: 'Study Room',
        pricePerMonth: 350,
        securityDeposit: 1000,
        images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 20,
        isAvailable: true
    },
    {
        name: 'Study Table (Engineered Wood)',
        description: 'Compact study desk with keyboard tray and drawer.',
        category: 'Furniture',
        subCategory: 'Study Room',
        pricePerMonth: 300,
        securityDeposit: 800,
        images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 15,
        isAvailable: true
    },
    {
        name: 'Bookshelf',
        description: 'Open 5-tier bookshelf for books and decor.',
        category: 'Furniture',
        subCategory: 'Study Room',
        pricePerMonth: 250,
        securityDeposit: 600,
        images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 8,
        isAvailable: true
    },

    // --- APPLIANCES ---
    {
        name: 'Refrigerator (Single Door)',
        description: '190L Single Door Refrigerator, 4 Star Energy Rating.',
        category: 'Appliances',
        subCategory: 'Kitchen',
        pricePerMonth: 800,
        securityDeposit: 2000,
        images: ['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJpZGdlfGVufDB8fDB8fHww'],
        stock: 10,
        isAvailable: true
    },
    {
        name: 'Refrigerator (Double Door)',
        description: '260L Double Door Refrigerator, Frost Free.',
        category: 'Appliances',
        subCategory: 'Kitchen',
        pricePerMonth: 1200,
        securityDeposit: 3000,
        images: ['https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJpZGdlfGVufDB8fDB8fHww'],
        stock: 5,
        isAvailable: true
    },
    {
        name: 'Washing Machine (Top Load)',
        description: '6.5 kg Fully Automatic Top Load Washing Machine.',
        category: 'Appliances',
        subCategory: 'Laundry',
        pricePerMonth: 900,
        securityDeposit: 2200,
        images: ['https://media.istockphoto.com/id/1175206215/photo/laundry-machine-with-open-hatch-and-jeans.webp?a=1&b=1&s=612x612&w=0&k=20&c=eHORW69lKuYLOMOqJlffehmfHA0rTiU2i9rEdgvI7Wg='],
        stock: 8,
        isAvailable: true
    },
    {
        name: 'Washing Machine (Front Load)',
        description: '7 kg Fully Automatic Front Load Washing Machine with Inbuilt Heater.',
        category: 'Appliances',
        subCategory: 'Laundry',
        pricePerMonth: 1300,
        securityDeposit: 3500,
        images: ['https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 4,
        isAvailable: true
    },
    {
        name: 'Microwave Oven',
        description: '23L Convection Microwave Oven for baking and grilling.',
        category: 'Appliances',
        subCategory: 'Kitchen',
        pricePerMonth: 400,
        securityDeposit: 1000,
        images: ['https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG92ZW58ZW58MHx8MHx8fDA%3D'],
        stock: 12,
        isAvailable: true
    },
    {
        name: 'Smart LED TV (32 inch)',
        description: '32 inch HD Ready Smart LED TV with Netflix/Prime support.',
        category: 'Appliances',
        subCategory: 'Entertainment',
        pricePerMonth: 600,
        securityDeposit: 1500,
        images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 10,
        isAvailable: true
    },
    {
        name: 'Smart LED TV (43 inch)',
        description: '43 inch Full HD Smart LED TV for immersive viewing.',
        category: 'Appliances',
        subCategory: 'Entertainment',
        pricePerMonth: 900,
        securityDeposit: 2500,
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 6,
        isAvailable: true
    },
    {
        name: 'Air Conditioner (1.5 Ton)',
        description: '1.5 Ton Split AC, 3 Star Inverter. Installation extra.',
        category: 'Appliances',
        subCategory: 'Cooling',
        pricePerMonth: 2000,
        securityDeposit: 5000,
        images: ['https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWN8ZW58MHx8MHx8fDA%3D'],
        stock: 5,
        isAvailable: true
    },
    {
        name: 'Water Purifier',
        description: 'RO + UV Water Purifier with 7L storage.',
        category: 'Appliances',
        subCategory: 'Kitchen',
        pricePerMonth: 450,
        securityDeposit: 1000,
        images: ['https://images.unsplash.com/photo-1628239532623-c035054bff4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBwdXJpZmllcnxlbnwwfHwwfHx8MA%3D%3D'],
        stock: 15,
        isAvailable: true
    },
    {
        name: 'Induction Cooktop',
        description: 'Portable induction cooktop with touch controls.',
        category: 'Appliances',
        subCategory: 'Kitchen',
        pricePerMonth: 150,
        securityDeposit: 500,
        images: ['https://plus.unsplash.com/premium_photo-1718051622749-4b7b79e9bba4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8SW5kdWN0aW9uJTIwQ29va3RvcHxlbnwwfHwwfHx8MA%3D%3D'],
        stock: 20,
        isAvailable: true
    },

    // --- PACKAGES ---
    // (Note: Currently mapping packages as products, but could be a separate schema later)
    {
        name: '1BHK Basic Package',
        description: 'Includes 1 Queen Bed, 1 Mattress, 1 Wardrobe, 1 Refrigerator (Single Door).',
        category: 'Packages',
        subCategory: 'Apartment',
        pricePerMonth: 2500,
        securityDeposit: 6000,
        images: ['https://media.istockphoto.com/id/2172825746/photo/small-simple-apartment-with-kitchen-and-big-bed-white-kitchen-furniture-refrigerator.webp?a=1&b=1&s=612x612&w=0&k=20&c=x1itVd3GNZFN3qPJjfmEIucgg1JdcsHapwDpEpeaJUs='],
        stock: 3,
        isAvailable: true
    },
    {
        name: 'Studio Apartment Package',
        description: 'Includes 1 Sofa Cum Bed, 1 Washer, 1 Mini Fridge.',
        category: 'Packages',
        subCategory: 'Apartment',
        pricePerMonth: 2000,
        securityDeposit: 5000,
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 4,
        isAvailable: true
    },

    // More Furniture Variances
    {
        name: 'Shoe Rack',
        description: 'Wooden shoe rack with seat cushion.',
        category: 'Furniture',
        subCategory: 'Entryway',
        pricePerMonth: 200,
        securityDeposit: 500,
        images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 8,
        isAvailable: true
    },
    {
        name: 'Chest of Drawers',
        description: '4-drawer chest for extra clothing storage.',
        category: 'Furniture',
        subCategory: 'Bedroom',
        pricePerMonth: 400,
        securityDeposit: 1000,
        images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 6,
        isAvailable: true
    },
    {
        name: 'Floor Lamp',
        description: 'Modern tripod floor lamp for living room ambiance.',
        category: 'Furniture',
        subCategory: 'Decor',
        pricePerMonth: 150,
        securityDeposit: 400,
        images: ['https://images.unsplash.com/photo-1673939859210-23d8444237ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvb3IlMjBsYW1wfGVufDB8fDB8fHww'],
        stock: 12,
        isAvailable: true
    },

    // Kitchen Utilities
    {
        name: 'Dishwasher',
        description: '12 Place setting dishwasher, ideal for families.',
        category: 'Appliances',
        subCategory: 'Kitchen',
        pricePerMonth: 1000,
        securityDeposit: 2500,
        images: ['https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 3,
        isAvailable: true
    },
    {
        name: 'Air Purifier',
        description: 'HEPA filter air purifier for clean indoor air.',
        category: 'Appliances',
        subCategory: 'Living Room',
        pricePerMonth: 500,
        securityDeposit: 1200,
        images: ['https://images.unsplash.com/photo-1632928274371-878938e4d825?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwcHVyaWZpZXJ8ZW58MHx8MHx8fDA%3D'],
        stock: 7,
        isAvailable: true
    }
];

// Add 20 more variations to reach ~50
const variations = [
    { name: 'Leather Sofa (2-Seater)', description: 'Compact leather sofa.', category: 'Furniture', subCategory: 'Living Room', price: 800, dep: 2000, img: 'https://plus.unsplash.com/premium_photo-1661699082515-24e99b178ff7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVhdGhlciUyMHNvZmF8ZW58MHx8MHx8fDA%3D' },
    { name: 'Recliner (Single)', description: 'Fabric recliner chair.', category: 'Furniture', subCategory: 'Living Room', price: 600, dep: 1500, img: 'https://images.unsplash.com/photo-1759722666919-14db39a6f347?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVjbGluZXIlMjBjaGFpcnxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Coffee Table (Glass)', description: 'Round glass coffee table.', category: 'Furniture', subCategory: 'Living Room', price: 300, dep: 800, img: 'https://plus.unsplash.com/premium_photo-1680546330888-f995d2d64571?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D' },
    { name: 'Bookshelf (Corner)', description: 'Space-saving corner bookshelf.', category: 'Furniture', subCategory: 'Study Room', price: 200, dep: 500, img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Office Chair (Basic)', description: 'Simple rolling office chair.', category: 'Furniture', subCategory: 'Study Room', price: 250, dep: 600, img: 'https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D' },
    { name: 'Dining Chair (Set of 2)', description: 'Pair of wooden dining chairs.', category: 'Furniture', subCategory: 'Dining', price: 300, dep: 600, img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Bar Stool', description: 'Adjustable height bar stool.', category: 'Furniture', subCategory: 'Dining', price: 150, dep: 400, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Microwave (Solo)', description: 'Basic solo microwave.', category: 'Appliances', subCategory: 'Kitchen', price: 300, dep: 800, img: 'https://images.unsplash.com/photo-1574226511250-f632dc204962?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Toaster', description: '2-slice popup toaster.', category: 'Appliances', subCategory: 'Kitchen', price: 100, dep: 300, img: 'https://plus.unsplash.com/premium_photo-1718559007272-26a72b83fdcc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9hc3RlcnxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Mixer Grinder', description: '750W Mixer Grinder with 3 jars.', category: 'Appliances', subCategory: 'Kitchen', price: 200, dep: 500, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWl4ZXIlMjBncmluZGVyfGVufDB8fDB8fHww' },
    { name: 'Iron', description: 'Steam iron.', category: 'Appliances', subCategory: 'Laundry', price: 100, dep: 200, img: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Vacuum Cleaner', description: 'Canister vacuum cleaner.', category: 'Appliances', subCategory: 'Cleaning', price: 400, dep: 1000, img: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Television (55 Inch)', description: '4K UHD Smart TV.', category: 'Appliances', subCategory: 'Entertainment', price: 1500, dep: 4000, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Home Theater', description: '5.1 Channel Home Theater System.', category: 'Appliances', subCategory: 'Entertainment', price: 800, dep: 2000, img: 'https://images.unsplash.com/photo-1662454420647-3d20ddcdb8f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMHRoZWF0ZXJ8ZW58MHx8MHx8fDA%3D' },
    { name: 'Gaming Console', description: 'Next-gen gaming console.', category: 'Appliances', subCategory: 'Entertainment', price: 1000, dep: 2500, img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Laptop', description: 'Business laptop i5.', category: 'Appliances', subCategory: 'Work', price: 1200, dep: 3000, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Tablet', description: '10 inch tablet.', category: 'Appliances', subCategory: 'Work', price: 500, dep: 1200, img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Camera', description: 'DSLR Camera with kit lens.', category: 'Appliances', subCategory: 'Hobbies', price: 1000, dep: 2500, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Treadmill', description: 'Foldable treadmill.', category: 'Appliances', subCategory: 'Fitness', price: 1500, dep: 4000, img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Exercise Bike', description: 'Stationary exercise bike.', category: 'Appliances', subCategory: 'Fitness', price: 800, dep: 2000, img: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Dumbbells Set', description: 'Adjustable dumbbells.', category: 'Appliances', subCategory: 'Fitness', price: 300, dep: 800, img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

variations.forEach(v => {
    products.push({
        name: v.name,
        description: v.description,
        category: v.category,
        subCategory: v.subCategory,
        pricePerMonth: v.price,
        securityDeposit: v.dep,
        images: [v.img],
        stock: Math.floor(Math.random() * 10) + 1,
        isAvailable: true
    });
});


const seedDB = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI.substring(0, 20) + '...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected...');

        // Check for existing data
        const count = await Product.countDocuments();
        if (count > 0 && process.argv[2] !== '--force') {
            console.log('⚠️  Data exists! Use "node seedProducts.js --force" to overwrite.');
            console.log('   Exiting to protect your Admin Dashboard changes.');
            process.exit();
        }

        // Clear existing data
        if (process.argv[2] === '--force') {
            console.log('DATA OVERWRITE ENABLED (--force)');
        }
        console.log('Clearing existing products...');
        await Product.deleteMany({});

        // Insert new data
        console.log(`Seeding ${products.length} products...`);
        const result = await Product.insertMany(products);
        console.log(`Inserted ${result.length} products`);

        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
