const { ValidationError } = require("sequelize");
const logWarn = require("../server.js").logWarn;
const logErr = require("../server.js").logErr;
const logInfo = require("../server.js").logInfo;
require("../server.js");
const Assignment = require("../models/assignments.js").assignment;

const isValidNumber = (value) => {
  return Number.isInteger(Number(value));
};

const createAssignment = async (req, res) => {
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  const { name, points, num_of_attemps, deadline } = req.body;
  if (bodyLength == 0) {
    res.sendStatus(400);
  } else {
    if (!isValidNumber(points) || !isValidNumber(num_of_attemps)) {
      logErr(`Assignment creation failed: Invalid Inputs`);
      return res.sendStatus(400);
    }
    // console.log(req.User.id);
    try {
      const assignment = await Assignment.create({
        name,
        points,
        num_of_attemps,
        deadline,
        userId: req.User.id,
      });
      logErr("Assignment successfully created");
      res.status(201).send(assignment);
    } catch (e) {
      if (e instanceof ValidationError) {
        res
          .status(403)
          .send(
            "Invalid Values of points and num_of_attemps between 0 and 100"
          );
        logWarn("Invalid input");
      } else {
        logErr(`Error at CreateAssignment: ${e}`);
        res.sendStatus(401);
      }
    }
  }
};

const getAllAssignments = async (req, res) => {
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  if (bodyLength > 0) {
    logErr("User request contains body")
    res.sendStatus(400);
  } else {
    try {
      const assignments = await Assignment.findAll({
        attributes: { exclude: ["userId"] },
      });
      logInfo("All assignments retrieved");
      res.status(200).send(assignments);
    } catch (e) {
      logErr(`Error at getAllAssignments: ${e}`);
      res.sendStatus(401);
    }
  }
};

const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  if (bodyLength > 0) {
    logErr("User request contains body")
    res.sendStatus(400);
  } else {
    try {
      const assignments = await Assignment.findByPk(id, {
        attributes: { exclude: ["userId"] },
      });
      if (assignments == null) {
        logInfo("Assignment requested not found");
        res.sendStatus(404);
      } else {
        logInfo("Assignment requested retrieved");
        res.status(200).send(assignments);
      }
    } catch (e) {
      logErr(`Error at CreateAssignment:${e}`);
      res.sendStatus(401);
    }
  }
};

const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { name, points, num_of_attemps, deadline } = req.body;
  if (!req.User.id) {
    logErr("Access denied for user");
    res.sendStatus(401);
  } else {
    // console.log(req.User.id);
    try {
      if (!isValidNumber(points) || !isValidNumber(num_of_attemps)) {
        logWarn("Assignment update fail: Invalid Input");
        return res.sendStatus(400);
      }
      const assignment = await Assignment.findByPk(id);
      if (assignment == null) {
        logInfo("Assignment fetch by ID unsucessfull: No assignment found");
        res.status(404).send("Assignment not found");
      } else {
        // console.log(assignment.userId);
        if (req.User.id == assignment.userId) {
          assignment.name = name;
          assignment.points = points;
          assignment.num_of_attemps = num_of_attemps;
          assignment.deadline = deadline;
          await assignment.save();
          logInfo("Assignment fetch by ID sucessfull");
          res.sendStatus(204);
        } else {
          logInfo("Assignment fetch by ID unsucessfull");
          res.sendStatus(403);
        }
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(400).send();
      } else {
        logErr(`Error at updateAssignment :${e}`);
        res.sendStatus(400);
      }
    }
  }
};

const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  const bodyLength = parseInt(req.get("Content-Length") || "0", 10);
  if (bodyLength > 0) {
    logErr("User request contains body")
    res.sendStatus(400);
  } else {
    if (req.User.id) {
      try {
        const assignment = await Assignment.findByPk(id);
        if (assignment == null) {
          logInfo("Assignment deletion unsucessfull: No assignment found");
          res.sendStatus(404);
        } else {
          console.log(assignment.userId);
          if (req.User.id == assignment.userId) {
            await assignment.destroy();
            logInfo("Assignment deletion sucessfull");
            res.status(204).send("Assignment Deleted successfully.");
          } else {
            logInfo("Assignment deletion unsucessfull");
            res.sendStatus(403);
          }
        }
      } catch (e) {
        if (!req.User.id) {
          logErr("Access denied for user");
          res.sendStatus(401);
        }
        logErr(`Error at deleteAssignment:${e}`);
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