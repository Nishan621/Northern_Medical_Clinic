import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import connectToDatabase from './db/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';

let db;

(async () => {
  try {
    db = await connectToDatabase();
  } catch (err) {
    console.error('Failed to initialize database:', err.message);
    process.exit(1);
  }
})();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied.');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

// Middleware for role-based access
const verifyRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send('Access denied.');
  }
  next();
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, dob, gender, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword, phone, address, dob, gender, role };
    const collection = db.collection('users');
    await collection.insertOne(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = db.collection('users');
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch profile
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    const collection = db.collection('users');
    const user = await collection.findOne({ _id: new ObjectId(req.user.userId) });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch medical records
app.get('/api/medical-records', verifyToken, async (req, res) => {
  try {
    const collection = db.collection('medicalRecords');
    const records = await collection.find({ patientId: req.user.userId }).toArray();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book appointment
app.post('/api/appointments', verifyToken, async (req, res) => {
  try {
    const { doctorId, appointmentDate } = req.body;
    const appointment = { patientId: req.user.userId, doctorId, appointmentDate, status: 'scheduled' };
    const collection = db.collection('appointments');
    await collection.insertOne(appointment);
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all appointments (for doctors and staff)
app.get('/api/appointments', verifyToken, verifyRole('doctor'), async (req, res) => {
  try {
    const collection = db.collection('appointments');
    const appointments = await collection.find({ doctorId: req.user.userId }).toArray();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payment endpoint
app.post('/api/payment', verifyToken, async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;
    const payment = { appointmentId, patientId: req.user.userId, amount, status: 'paid' };
    const collection = db.collection('payments');
    await collection.insertOne(payment);
    res.status(201).json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});