const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // If you are using a .env file

// 1. Initialize app FIRST
const app = express();

// 2. Apply Middleware SECOND
app.use(cors()); 
app.use(express.json());

// 3. Define Routes
// (Make sure this matches the path where you saved your Event routes)
// const eventRoutes = require('./routes/events'); 
// app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// 4. Database Connection & Server Start
// Make sure your MONGO_URI is in your .env file in the backend folder
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`My Mongo URL is: ${MONGO_URI}`);
        app.listen(PORT, () => {
            console.log(`Events server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });