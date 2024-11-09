const express = require("express");
const cors = require("cors");
require('dotenv').config();
const dbConfig = require("./app/config/db.config");
var bcrypt = require("bcryptjs");
const app = express();


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const MedicalRecord = db.record;
const Doctor = db.doctor;

// mongoose.connect("mongodb+srv://karan_admin:Kar2003@cluster0.oq0g1g1.mongodb.net/userDB", {useNewUrlParser: true});

db.mongoose
  .connect(`mongodb+srv://karan_admin:${dbConfig.PASS}@cluster0.oq0g1g1.mongodb.net/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}



// 
app.get('/patient/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('roles'); // Populate roles if needed
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fileparser = require('./fileparser');

app.post('/api/uploadfile', async (req, res) => {
  try {
    const { fileUrl, fields } = await fileparser(req);

    const newRecord = new MedicalRecord({
      userId: fields.userId,
      title: fields.title,
      description: fields.description,
      fileUrl
    });

    const savedRecord = await newRecord.save();
    
    res.status(200).json({
      message: "Record saved successfully",
      data: savedRecord
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred.",
      error
    });
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



app.post('/api/doctor/register', async (req, res) => {
  try {
    const { fileUrl, fields } = await fileparser(req);

    // Create a new doctor instance and save it to the database
    const newDoctor = new Doctor({
      fullName: fields.fullName,
      dateOfBirth: fields.dateOfBirth,
      phoneNumber: fields.phoneNumber,
      email: fields.email,
      address: fields.address,
      medicalDegrees: fields.medicalDegrees,
      specializations: fields.specializations,
      registrationNumber: fields.registrationNumber,
      yearsOfExperience: fields.yearsOfExperience,
      workHistory: fields.workHistory,
      specialSkills: fields.specialSkills,
      clinicName: fields.clinicName,
      clinicAddress: fields.clinicAddress,
      clinicContact: fields.clinicContact,
      consultationTimings: fields.consultationTimings,
      profilePicture: fileUrl,
      password: bcrypt.hashSync(fields.password, 8)
    });

    await newDoctor.save();

    res.status(200).json({
      message: 'Doctor registered successfully',
      doctor: newDoctor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/getdoctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({}, 'profilePicture fullName specializations medicalDegrees');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/doctordetail/:doctorId', async (req, res) => {
  try {
    const doctors = await Doctor.findById(req.params.doctorId);
    if (!doctors) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/doctor/profile/:doctorId', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});