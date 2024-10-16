const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express app
const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // For parsing application/json

// MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017/programs';

// Connect to MongoDB (No need for `useNewUrlParser` or `useUnifiedTopology` in newer versions)
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define a schema and model for your "programs"
const programSchema = new mongoose.Schema({
  program_name: String,
  program_start_date: Date,
  program_end_date: Date,
  status: Number // 1 for DRAFT, 2 for LIVE
});

const Program = mongoose.model('Program', programSchema);

// Create an API endpoint to get all programs
app.get('/api/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
