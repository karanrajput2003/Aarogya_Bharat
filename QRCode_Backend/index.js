// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
mongoose.connect('mongodb+srv://karan_admin:Kar2003@cluster0.oq0g1g1.mongodb.net/Aarogya_Bharat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const MedicalRecord = mongoose.model(
  "MedicalRecord",
  new mongoose.Schema({
    userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true }
}, {
  timestamps: true
  })
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    aadhar_no: String,
    Address: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);



app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

app.get('/api/medicalRecords/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const records = await MedicalRecord.find({ userId });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({ message: 'Failed to retrieve medical records' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
