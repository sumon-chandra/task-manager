require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});
// MongoDB comments
const uri = `mongodb+srv://${process.env.MONGODB_USER_MANE}:${process.env.MONGODB_USER_PASSWORD}@cluster0.lh1oos6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.log(`Connecting error to MongoDB:- ${error.message}`);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
