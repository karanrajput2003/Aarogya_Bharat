const express = require("express");
const cors = require("cors");
require('dotenv').config();
const dbConfig = require("./app/config/db.config");
var bcrypt = require("bcryptjs");
const moment = require("moment");
const app = express();

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
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
const Slot = db.slots;
const Consult = db.consult;

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


app.get("/api/slots/:doctorId/:date", async (req, res) => {
  const { doctorId, date } = req.params;
  const slots = await Slot.findOne({ doctorId, date });
  if (slots) {
    res.json(slots.times.filter(slot => !slot.isBooked));
  } else {
    res.status(404).json({ message: "No slots found" });
  }
});

// API to book a slot
app.post("/api/book", async (req, res) => {
  const { doctorId, date, time } = req.body;

  // Find slot document for doctor and date
  const slotDoc = await Slot.findOne({ doctorId, date });
  if (!slotDoc) {
    return res.status(404).json({ message: "Slot not found" });
  }

  // Find the specific time slot and mark it as booked
  const slot = slotDoc.times.find((t) => t.time === time);
  if (!slot || slot.isBooked) {
    return res.status(400).json({ message: "Slot already booked" });
  }
  
  slot.isBooked = true;
  await slotDoc.save();

  res.json({ message: "Appointment booked successfully" });
});

app.post("/api/doctor/addSlots", async (req, res) => {
  const { doctorId, date, startTime, endTime, breaks } = req.body;

  // Validate that the slot date is within the next 7 days
  const currentDate = new Date();
  const slotDate = new Date(date);
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 7);

  if (slotDate < currentDate || slotDate > maxDate) {
    return res.status(400).json({ message: "Slots can only be added for the next 7 days." });
  }

  // Generate 15-minute slots excluding breaks
  const slots = [];
  let time = moment(startTime, "HH:mm");
  const end = moment(endTime, "HH:mm");

  while (time < end) {
    const formattedTime = time.format("HH:mm");
    const isInBreak = breaks.some(
      (breakPeriod) =>
        moment(formattedTime, "HH:mm").isBetween(
          moment(breakPeriod.start, "HH:mm"),
          moment(breakPeriod.end, "HH:mm"),
          null,
          "[)"
        )
    );

    if (!isInBreak) {
      slots.push({ time: formattedTime, isBooked: false });
    }
    time.add(15, "minutes");
  }

  // Save slots for the date
  await Slot.findOneAndUpdate(
    { doctorId, date },
    { doctorId, date, times: slots },
    { upsert: true }
  );

  res.json({ message: "Slots added successfully", slots });
});

app.get("/api/getdoctors", async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors
    res.json(doctors); // Return doctors as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get('/api/doctors/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor data' });
  }
});

// API route to verify the doctor
app.patch('/api/doctors/verify/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update doctor verification status
    doctor.verified = true;
    await doctor.save();

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying doctor' });
  }
});
const axios = require('axios'); // Make sure axios is imported
const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
const MERCHANT_ID = "PGTESTPAYUAT86";
const MERCHANT_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";
const redirectUrl = "http://localhost:8080/status";
const successUrl = "http://localhost:5173/patient/myappointments";
const failureUrl = "http://localhost:5173/payment-failure";

// Create Order Route
app.post('/create-order', async (req, res) => {
  console.log(req.body);
  const { doctorId, date, time, userId } = req.body;
  const orderId = uuidv4();

  const consultation = new Consult({
    patient: {
      userId, 
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      medicalHistory: req.body.medicalHistory,
      symptoms: req.body.symptoms,
      insuranceProvider: req.body.insuranceProvider,
      policyNumber: req.body.policyNumber,
    },
    consultationDetails: {
      doctorId,
      preferredDate: date,
      preferredTime: time,
    },
    consentToConsultation: req.body.consentToConsultation,
    additionalNotes: req.body.additionalNotes,
  });

  await consultation.save();

  const paymentPayload = {
    merchantId: MERCHANT_ID,
    merchantUserId: userId,
    mobileNumber: 1212121212,
    amount: 400*100,
    merchantTransactionId: orderId,
    redirectUrl: `${redirectUrl}/?id=${orderId}`,
    redirectMode: 'POST',
    paymentInstrument: { type: 'PAY_PAGE' }
  };

  const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
  const keyIndex = 1;
  const string = payload + '/pg/v1/pay' + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const option = {
    method: 'POST',
    url: MERCHANT_BASE_URL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum
    },
    data: { request: payload }
  };

  try {
    const slots = await Slot.findOne({ doctorId, date });

    if (!slots) {
      return res.status(404).json({ message: "No slots found for this doctor on this date." });
    }

    // Check if the selected slot is available
    const slot = slots.times.find(slot => slot.time === time && !slot.isBooked);

    if (!slot) {
      return res.status(400).json({ message: "This slot is either taken or invalid." });
    }

    // Update the slot to reflect booking
    slot.isBooked = true;
    slot.userId = userId;
    slot.amount = 100;
    slot.merchantTransactionId = orderId;
    slot.status = 'SUCCESS';

    // Save updated slot
    await slots.save();

    // Send the payment request to PhonePe API
    const paymentResponse = await axios.request(option);

    // Assuming the PhonePe API returns a redirect URL in the response data
    const redirectUrl = paymentResponse.data.data.instrumentResponse.redirectInfo.url;

    res.status(200).json({ msg: "OK", url: redirectUrl });

  } catch (error) {
    console.error("Error in payment:", error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// Payment Status Route
app.post('/status', async (req, res) => {
  const merchantTransactionId = req.query.id;

  const keyIndex = 1;
  const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const option = {
    method: 'GET',
    url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': MERCHANT_ID
    }
  };

  try {
    const response = await axios.request(option);
    const paymentSuccess = response.data.success;

    // Determine the payment status
    const status = paymentSuccess ? 'SUCCESS' : 'FAILED';
    
    // Update the slot's status based on the transaction ID
    const updatedSlot = await Slot.findOneAndUpdate(
      { merchantTransactionId },
      { status },
      { new: true }
    );

    if (!updatedSlot) {
      return res.status(404).json({ error: 'Slot not found for this transaction ID' });
    }

    if (paymentSuccess) {
      return res.redirect(successUrl);
    } else {
      return res.redirect(failureUrl);
    }
  } catch (error) {
    console.error("Error in checking payment status:", error);
    res.status(500).json({ error: 'Failed to retrieve payment status' });
  }
});

app.get("/api/doctor/slots/:doctorId/:date", async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    const slots = await Slot.findOne({ doctorId, date });

    if (!slots) {
      return res.status(404).json({ message: "No slots found for this doctor on this date." });
    }

    const availableSlots = slots.times.filter(slot => !slot.isBooked);

    res.json(availableSlots); // Return only available slots
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ message: "Error fetching slots" });
  }
});

// API to book a slot for a patient
app.post("/api/doctor/bookSlot", async (req, res) => {
  try {
    const { doctorId, date, time, userId } = req.body;

    const slots = await Slot.findOne({ doctorId, date });

    if (!slots) {
      return res.status(404).json({ message: "No slots found for this doctor on this date." });
    }

    const slot = slots.times.find(slot => slot.time === time && !slot.isBooked);

    if (!slot) {
      return res.status(400).json({ message: "This slot is either taken or invalid." });
    }

    // Update the slot to reflect booking
    slot.isBooked = true;
    slot.userId = userId;

    await slots.save();

    res.json({ message: "Slot booked successfully!" });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ message: "Error booking slot" });
  }
});