import { MongoClient, ServerApiVersion } from "mongodb"
import { mongoose } from 'mongoose'


const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
console.log(`Connecting to MongoDB at URI: ${process.env.DB_URI ? 'URI found' : 'No URI provided'}`);

mongoose.connect(process.env.DB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
