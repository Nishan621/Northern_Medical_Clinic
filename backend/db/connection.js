// filepath: /d:/Apic/Capstone B/Northern_Medical_Clinic/NMC/backend/db/connection.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MONGO_URI is not defined in the .env file');
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectToDatabase = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db(); // Use the default database from the connection string
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err.message);
      throw err;
    }
  }
  return db;
};

export default connectToDatabase;