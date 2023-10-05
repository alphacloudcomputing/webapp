require("dotenv").config();

// Importing require module
const conEst = require("./server.js");
const auth = require("./middleware/auth.js");
const parsecsv = require("./initUsers.js");
const AssignmentController = require("./controllers/assignmentController.js");
const express = require("express");

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
app.all("/healthz", function (req, res) {
  if (req.method != "GET") {
    res.status(405).send();
  } else {
    // Setting no-cache
    res.set("Cache-Control", "no-cache");
    // Setting up variable bodyParser to check if any content is present in request body
    const bodyParser = parseInt(req.get("Content-Length") || "0", 10);
    // Checking if the request contains a body
    if (Object.keys(req.query).length > 0 || bodyParser > 0) {
      res.status(400).send();
    } else {
      conEst
        .conn()
        .then((data) => {
          // When connection is established
          if (data) {
            res.status(200).send();
          } else {
            res.status(503).send();
          }
        })
        // Logging error if connection failed
        .catch((err) => {
          console.log(err);
        });
    }
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
    res.sendStatus(405).send;
  }
  res.status(404).send();
});

app.listen(6000, (err) => {
  if (err) throw err;
  else {
    console.log("listening on port 6000");
  }
});
module.exports = app