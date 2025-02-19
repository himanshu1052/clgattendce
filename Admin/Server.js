import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './db/db.js'; // Database connection

// Import Routes
import contactRoutes from './Routes/messageroutes.js'; // Contact Form Routes
import submissionRoutes from './Routes/submissionRoutes.js'; // Submission Form Routes
import companyRoutes from './Routes/companyRoutes.js'; // Company Registration Routes

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectdb();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON body

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 Technovation Backend Running Successfully!');
});

// API Routes
app.use("/api", contactRoutes); // Contact Form API
app.use("/api", submissionRoutes); // Submission Form API
app.use("/api/company", companyRoutes); // Company Registration API

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
