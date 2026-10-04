const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth.js');
const eventRoutes = require('./routes/events.js');
const bookingRoutes = require('./routes/bookings.js');

const dns = require("dns");

// Prefer IPv4 on Windows
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log("MongoDB Connected Successfully");
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});