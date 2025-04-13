const express = require("express");
const cors = require("cors");
require('dotenv').config();
const dbConfig = require("./app/config/db.config");
var bcrypt = require("bcryptjs");
const moment = require("moment");
const app = express();
const nodemailer = require("nodemailer");
const axios = require('axios'); // Make sure axios is imported


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
const Medicine = db.medicine;
const Prescription = db.prescription;
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

// app.post('/api/uploadfile', async (req, res) => {
//   try {
//     const { fileUrl, fields } = await fileparser(req);

//     const newRecord = new MedicalRecord({
//       userId: fields.userId,
//       title: fields.title,
//       description: fields.description,
//       fileUrl
//     });

//     const savedRecord = await newRecord.save();
    
//     res.status(200).json({
//       message: "Record saved successfully",
//       data: savedRecord
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "An error occurred.",
//       error
//     });
//   }
// });


// Upload File Using Pinata
app.post('/api/uploadfile', async (req, res) => {
  try {
    const { userId, title, description,fileUrl} = req.body;

      const newRecord = new MedicalRecord({
      userId,
      title,
      description,
      fileUrl,
    });

    const savedRecord = await newRecord.save();
    
    res.status(200).json({
      message: "Record saved successfully",
      data: savedRecord,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred.",
      error,
    });
  }
});

// To delete the record
app.delete('/api/medicalRecords/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await MedicalRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "An error occurred.", error });
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
    const doctors = await Doctor.find();
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
const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
const MERCHANT_ID = "PGTESTPAYUAT86";
const MERCHANT_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";
const redirectUrl = "https://aarogya-bharat.vercel.app/status";
const successUrl = "https://aarogya-bharat.vercel.app/patient/myappointments";
const failureUrl = "https://aarogya-bharat.vercel.app/payment-failure";

// Create Order Route
app.post("/create-order", async (req, res) => {
  const { doctorId, date, time, userId, email, name, phone, medicalHistory, symptoms, insuranceProvider, policyNumber, consentToConsultation, additionalNotes } = req.body;

  const orderId = uuidv4();

  try {
    // Transporter setup for nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hackathonbandra@gmail.com", // Your email address
        pass: "ipgj baqa uxiq lpsq", // Use an App Password instead of plain password
      },
    });

    // Mail options
    const mailOptions = {
      from: "hackathonbandra@gmail.com",
      to: email, // Email from request body
      subject: "Appointment Booking Confirmation – Aarogya Bharat",
      text: `Dear ${name},

Thank you for booking an appointment with Aarogya Bharat.

Your appointment request has been successfully submitted and is currently awaiting approval from the doctor. Once the doctor approves your appointment, you will receive a confirmation email with the meeting link for the consultation.

Here are the details of your appointment request:

Doctor's Id: ${doctorId}
Requested Date & Time: ${date} ${time}
Mode of Consultation: Video Call

We aim to ensure a seamless experience for you. If you have any questions or need further assistance, feel free to reach out to us at hackathonbandra@gmail.com .

Stay healthy,
The Aarogya Bharat Team

Note:
This is an automated email. Please do not reply to this message directly.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Create and save consultation
    const consultation = new Consult({
      patient: {
        userId,
        name,
        phone,
        email,
        medicalHistory,
        symptoms,
      },
      insuranceDetails: {
        insuranceProvider,
        policyNumber,
      },
      consultationDetails: {
        doctorid: doctorId,
        preferredDate: date,
        preferredTime: time,
      },
      consentToConsultation,
      additionalNotes,
    });

    await consultation.save();

    // Prepare payment payload
    const paymentPayload = {
      merchantId: MERCHANT_ID,
      merchantUserId: userId,
      mobileNumber: phone,
      amount: 400 * 100, // Amount in paise
      merchantTransactionId: orderId,
      redirectUrl: `${redirectUrl}/?id=${orderId}`,
      redirectMode: "POST",
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString("base64");
    const keyIndex = 1;
    const string = payload + "/pg/v1/pay" + MERCHANT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const option = {
      method: "POST",
      url: MERCHANT_BASE_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: payload },
    };

    // Check and update slot availability
    const slots = await Slot.findOne({ doctorId, date });

    if (!slots) {
      return res.status(404).json({ message: "No slots found for this doctor on this date." });
    }

    const slot = slots.times.find((slot) => slot.time === time && !slot.isBooked);

    if (!slot) {
      return res.status(400).json({ message: "This slot is either taken or invalid." });
    }

    slot.isBooked = true;
    slot.userId = userId;
    slot.amount = 400;
    slot.merchantTransactionId = orderId;
    slot.status = "SUCCESS";

    await slots.save();

    // Send the payment request to PhonePe API
    const paymentResponse = await axios.request(option);

    const redirectInfo = paymentResponse.data?.data?.instrumentResponse?.redirectInfo;

    if (!redirectInfo || !redirectInfo.url) {
      return res.status(500).json({ error: "Invalid response from payment gateway." });
    }

    res.status(200).json({ msg: "OK", url: redirectInfo.url });
  } catch (error) {
    console.error("Error in create-order:", error);
    res.status(500).json({ error: "Failed to process order." });
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


// Get all appointments
app.get("/getappointments", async (req, res) => {
  try {
    const consultations = await Consult.find();
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

// Get appointment Details By id
app.get("/api/appointments/:id", async (req, res) => {
  try {
    const appointment = await Consult.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all payments
app.get("/api/getpayments", async (req, res) => {
  try {
    // Retrieve all time slots that have been booked (where userId is not null)
    const payments = await Slot.aggregate([
      { $unwind: "$times" }, // Unwind the times array to treat each time slot as a separate document
      { $match: { "times.userId": { $ne: null } } }, // Filter booked slots
      {
        $project: {
          _id: 0,
          id: "$_id",
          doctorId: 1,
          patientName: "$times.userId", // Assuming `userId` corresponds to a patient's ID or name; modify as needed
          amount: "$times.amount",
          paymentDate: "$times.createdAt",
          status: "$times.status",
          transactionId: "$times.merchantTransactionId",
        },
      },
    ]);

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// API to fetch all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await User.find(); // Select the required fields
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// API to fetch recent appointments
app.get('/api/recent-appointments', async (req, res) => {
  try {
    const appointments = await Consult.find()
      .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
      .limit(5) // Limit to 5 appointments
      .populate('patient.userId', 'name email phone')  // Populate patient info
      .populate('consultationDetails.doctorid', 'name')  // Populate doctor info
      .select('patient consultationDetails status createdAt') // Select relevant fields

    // Format the response to return only necessary fields
    const formattedAppointments = appointments.map(appointment => ({
      patientName: appointment.patient.name,
      doctorName: appointment.consultationDetails.doctorid,
      preferredDate: appointment.consultationDetails.preferredDate,
      preferredTime: appointment.consultationDetails.preferredTime,
      status: appointment.status,
      _id: appointment._id,
      createdAt: appointment.createdAt,
    }));
    res.json(formattedAppointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Endpoint to fetch top 5 doctors
app.get('/api/topdoctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().limit(5);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Fetch appointments based on doctorid
app.get('/appointments', async (req, res) => {
  try {
    const { doctorid } = req.query;

    if (!doctorid) {
      return res.status(400).json({ error: 'Doctor ID is required' });
    }

    // Querying the nested path "consultationDetails.doctorid"
    const appointments = await Consult.find({ 'consultationDetails.doctorid': doctorid })
      .sort({ 'consultationDetails.preferredDate': 1 }); // Sort by preferredDate

    return res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.put('/appointments/:id/schedule', async (req, res) => {
  try {
    const appointment = await Consult.findById(req.params.id);

    const name = appointment.patient.name;
    const email = appointment.patient.email;
    const date = appointment.consultationDetails.preferredDate.toLocaleDateString();
    const time = appointment.consultationDetails.preferredTime;
    const doctorId = appointment.consultationDetails.doctorid;
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hackathonbandra@gmail.com", // Your email address
        pass: "ipgj baqa uxiq lpsq", // Use an App Password instead of plain password
      },
    });

    // Mail options
    const mailOptions = {
      from: "hackathonbandra@gmail.com",
      to: email,
      subject: "Your Appointment is Confirmed – Aarogya Bharat",
      text: `Dear ${name},

We are pleased to inform you that your appointment has been approved by Doctor. Below are the confirmed details of your appointment:

Doctor's Id: ${doctorId}
Date & Time: ${date} at ${time}
Mode of Consultation: Video Call
Meeting Link: https://aarogya-bharat-video-call.onrender.com/kdkskdn1q121

Please click on the above link to join the consultation at the scheduled time. Ensure you have a stable internet connection and are ready with any relevant medical records or details for discussion.

If you have any issues joining the meeting or need to reschedule, feel free to contact us at hackathonbandra@gmail.com.

We look forward to assisting you with your healthcare needs.

Stay healthy,
The Aarogya Bharat Team

Note:
This is an automated email. Please do not reply to this message directly.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    appointment.status = 'Scheduled';
    await appointment.save();

    res.status(200).json({ message: 'Appointment scheduled successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.put('/api/appointments/status/:id', async (req, res) => {
  const { status } = req.body;

  // Only allow changing to "Completed"
  if (status !== 'Completed') {
    return res.status(400).send('Only "Completed" status is allowed');
  }

  try {
    const updatedAppointment = await Consult.findByIdAndUpdate(req.params.id, { status: 'Completed' }, { new: true });
    if (!updatedAppointment) {
      return res.status(404).send('Appointment not found');
    }
    res.send(updatedAppointment);
  } catch (error) {
    res.status(500).send('Error updating appointment status');
  }
});

// Backend route to fetch appointments by userId
app.get('/api/myappointments', async (req, res) => {
  try {
    const { userId } = req.query;  // Get userId from query params
    const appointments = await Consult.find({ 'patient.userId': userId });
    res.status(200).json(appointments);  // Return appointments
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


// Get all medicines
app.get("/medicine", async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ name: 1 })
    res.json(medicines)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get medicine by ID
app.get("/medicine/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" })
    }
    res.json(medicine)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Create new medicine
app.post("/medicine", async (req, res) => {
  try {
    const { name, type, dosageUnit, description, defaultInstructions } = req.body

    const newMedicine = new Medicine({
      name,
      type,
      dosageUnit,
      description,
      defaultInstructions,
    })

    const medicine = await newMedicine.save()
    res.status(201).json(medicine)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Update medicine
app.put("/medicine/:id", async (req, res) => {
  try {
    const { name, type, dosageUnit, description, defaultInstructions } = req.body

    const medicine = await Medicine.findById(req.params.id)
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" })
    }

    medicine.name = name
    medicine.type = type
    medicine.dosageUnit = dosageUnit
    medicine.description = description
    medicine.defaultInstructions = defaultInstructions

    await medicine.save()
    res.json(medicine)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Delete medicine
app.delete("/medicine/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" })
    }

    // Change this line:
    // await medicine.remove()
    // To this:
    await Medicine.deleteOne({ _id: req.params.id })

    res.json({ message: "Medicine removed" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Search medicines
app.get("/medicines/suggest", async (req, res) => {
  try {
    const query = req.query.query

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" })
    }

    const medicines = await Medicine.find({
      $or: [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }],
    }).limit(10)

    res.json(medicines)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get all prescriptions
app.get("/prescriptions", async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate("patientId", "name").sort({ createdAt: -1 })
    res.json(prescriptions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get prescription by ID
app.get("/prescriptions/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate("patientId", "name email phone")

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" })
    }

    res.json(prescription)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Create new prescription
app.post("/prescriptions", async (req, res) => {
  try {
    const { patientId, appointmentId, medicines } = req.body;

    const newPrescription = new Prescription({
      patientId,
      appointmentId,
      medicines,
    });

    const prescription = await newPrescription.save();

    // Fetch patient details for sending email
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hackathonbandra@gmail.com", // Your email address
        pass: "ipgj baqa uxiq lpsq", // Use an App Password instead of plain password
      },
    });

    // Mail options
    const mailOptions = {
      from: "hackathonbandra@gmail.com",
      to: patient.email,
      subject: "Your Prescription from Aarogya Bharat",
      text: `Dear ${patient.username},

Your prescription has been generated. Below are the details:

Medicines:
${medicines
  .map(
    (medicine, index) =>
      `${index + 1}. ${medicine.name} - ${medicine.dosage} ${medicine.unit} (${medicine.instructions})`
  )
  .join("\n")}

Please follow the instructions provided by your doctor. If you have any questions, feel free to contact us at hackathonbandra@gmail.com.

Stay healthy,
The Aarogya Bharat Team

Note:
This is an automated email. Please do not reply to this message directly.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
