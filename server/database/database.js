import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config();
const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error('Database URI is not defined in the environment variables');
}

const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

console.log(`Connecting to MongoDB at URI: ${dbUri ? 'URI found' : 'No URI provided'}`);

mongoose.connect(dbUri, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
.then(() => {
  console.log('Connected to MongoDB via Mongoose');
})
.catch(err => {
  console.error('Error connecting to MongoDB via Mongoose', err);
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB using MongoClient!");
  } catch (err) {
    console.error('Error connecting to MongoDB via MongoClient', err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
