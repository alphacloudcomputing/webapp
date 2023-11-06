require("dotenv").config();

// Importing require module
const conEst = require("./server.js");
const auth = require("./middleware/auth.js");
const parsecsv = require("./initUsers.js");
const AssignmentController = require("./controllers/assignmentController.js");
const express = require("express");
const logWarn = require("./server.js").logWarn;
const logErr = require("./server.js").logErr;
const logInfo = require("./server.js").logInfo;


// Setting up express router instance
const app = express();
app.use(express.json());

// Get all available Assignments from DB
app.get(
  "/v1/assignments",
  auth.verifyUser,
  AssignmentController.getAllAssignments
);

// Find Assignment by ID
app.get("/v1/assignments/:id", auth.verifyUser, async (req, res) => {
  AssignmentController.getAssignmentById(req, res);
});

// Create Assignment
app.post("/v1/assignments", auth.verifyUser, async (req, res) => {
  AssignmentController.createAssignment(req, res);
});

// Update Assignment
app.put("/v1/assignments/:id", auth.verifyUser, async (req, res) => {
  AssignmentController.updateAssignment(req, res);
});

//Delete Assignment
app.delete("/v1/assignments/:id", auth.verifyUser, async (req, res) => {
  AssignmentController.deleteAssignment(req, res);
});

//Route configuration
app.all("/healthz", async (req, res) => {
  res.set("Cache-control", "no-cache");
  AssignmentController.stats.increment(`api.healthz.get.calls`)
  try {
    const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
    if (req.method === "GET") {
      // Checking for body and query lengths
      if (Object.keys(req.query).length > 0 || bodyLength > 0) {
        res.status(400).send(); // Bad request
      } else {
        const data = await conEst.sql();
        if (!data) {
          res.status(503).send(); // Not connected
        } else {
          res.status(200).send(); // Connected
        }
      }
    } else {
      res.status(405).send(); // Method not allowed (except GET)
    }
  } catch (error) {
    // Handle the database connection error here
    logErr(`Database connection error: ${error}`);
    res.status(503).send(); // Database connection error
  }
});

app.all("/v1/assignments/*", (req, res) => {
  res.sendStatus(405).send;
});
app.all("/v1/assignments/:id/*", (req, res) => {
  res.sendStatus(405).send;
});

// Setting up Method not allowed (STATUS CODE: 405)
app.all("/*", (req, res) => {
  if (req.method == "PATCH") {
    logWarn("User tried accessing PATCH method");
    res.sendStatus(405).send;
  }
  res.status(404).send();
});

app.listen(6000, (err) => {
  if (err) throw err;
  else {
    logInfo("Listening on port 6000");
  }
});
module.exports = app;
