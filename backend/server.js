const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb://127.0.0.1:27017/programs';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define a schema and model for your "programs"
const programSchema = new mongoose.Schema({
  program_name: String,
  program_short_description: String,
  program_start_date: Date,
  program_end_date: Date,
  status: Number // 0 for LIVE, 1 for DRAFT
});

const Program = mongoose.model('Program', programSchema);

// Get all programs
app.get('/api/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a program by ID
app.delete('/api/programs/:id', async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json({ message: 'Program deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Duplicate a program
app.post('/api/programs', async (req, res) => {
  const { program_name, program_short_description, program_start_date, program_end_date, status } = req.body;
  try {
    const newProgram = new Program({
      program_name,
      program_short_description,
      program_start_date,
      program_end_date,
      status
    });
    const savedProgram = await newProgram.save();
    res.json(savedProgram);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
