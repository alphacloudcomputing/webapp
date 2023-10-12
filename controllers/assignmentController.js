const { ValidationError } = require("sequelize");

require("../server.js");

const Assignment = require("../models/assignments.js").assignment;

const createAssignment = async (req, res) => {
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  const { name, points, num_of_attemps, deadline } = req.body;
  if (bodyLength == 0) {
    res.sendStatus(400);
  } else {
    // console.log(req.User.id);
    try {
      const assignment = await Assignment.create({
        name,
        points,
        num_of_attemps,
        deadline,
        userId: req.User.id,
      });
      res.status(201).send(assignment);
    } catch (e) {
      if (e instanceof ValidationError) {
        res
          .status(403)
          .send(
            "Invalid Values of points and num_of_attemps between 0 and 100"
          );
      } else {
        console.log(e);
        res.sendStatus(401);
      }
    }
  }
};

const getAllAssignments = async (req, res) => {
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  if (bodyLength > 0) {
    res.sendStatus(400);
  } else {
    try {
      const assignments = await Assignment.findAll();
      res.status(200).send(assignments);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
};

const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  if (bodyLength > 0) {
    res.sendStatus(400);
  } else {
    try {
      const assignments = await Assignment.findByPk(id);
      if (assignments == null) {
        res.sendStatus(404);
      } else {
        res.status(200).send(assignments);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  }
};

const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { name, points, num_of_attemps, deadline } = req.body;
  if (!req.User.id) {
    res.sendStatus(401);
  } else {
    // console.log(req.User.id);
    try {
      const assignment = await Assignment.findByPk(id);
      if (assignment == null) {
        res.status(404).send("Assignment not found");
      } else {
        // console.log(assignment.userId);
        if (req.User.id == assignment.userId) {
          assignment.name = name;
          assignment.points = points;
          assignment.num_of_attemps = num_of_attemps;
          assignment.deadline = deadline;
          await assignment.save();
          res.sendStatus(204);
        } else {
          res.sendStatus(403);
        }
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        res
          .status(400)
          .send();
      } else {
        console.log(e);
        res.sendStatus(400);
      }
    }
  }
};

const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  if (bodyLength > 0) {
    res.sendStatus(400);
  } else {
    if (req.User.id) {
      try {
        const assignment = await Assignment.findByPk(id);
        if (assignment == null) {
          res.sendStatus(404);
        } else {
          console.log(assignment.userId);
          if (req.User.id == assignment.userId) {
            await assignment.destroy();
            res.status(200).send("Assignment Deleted successfully.");
          } else {
            res.sendStatus(403);
          }
        }
      } catch (e) {
        if(!req.User.id){
          res.sendStatus(401)
        }
        console.log(e);
        res.sendStatus(403);
      }
    }
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
