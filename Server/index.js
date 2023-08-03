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
const uri = `mongodb+srv://sumon-task-manager:sumon-task-manager@cluster0.lh1oos6.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    // MongoDB collections
    const tasksCollection = client.db("taskManageDB").collection("tasks");

    // Routes
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });

    app.get("/tasks", async (req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });
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
