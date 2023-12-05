const { ValidationError, UUID } = require("sequelize");
const statsd = require("node-statsd");
const logWarn = require("../server.js").logWarn;
const logErr = require("../server.js").logErr;
const logInfo = require("../server.js").logInfo;
const Assignment = require("../models/assignments.js").assignment;
const Submission = require("../models/submission.js").submission;
const AWS = require("aws-sdk");
// const User = require("../models/users.js");
require("../server.js");

const stats = new statsd({
  host: "localhost",
  port: 8125,
})

const createSubmission = async (req, res) => {
  stats.increment(`api.submission.post.calls`)
  if (bodyLength == 0) {
    res.sendStatus(400);
  } else {
  try {
    const userId = req.User.id;
    const { submission_url } = req.body;
    const assignmentId = req.params.id;
    const submissionCount = await Submission.count({
      where: {
        userId: userId,
        assignmentId: assignmentId,
      },
    });

    // Fetch the assignment
    const assignmentRecord = await Assignment.findByPk(assignmentId);
    if (!assignmentRecord) {
      res.sendStatus(404);
      return "Assignment not found";
    }

    //   Check if the current time is past the assignment's deadline
    if (new Date() > assignmentRecord.deadline) {
      res.status(403).send("Cannot submit, past the deadline");
    } else if (submissionCount >= assignmentRecord.num_of_attemps) {
      res.status(403).send("Maximum number of attempts exceeded");
    } else {
      // Create the submission
      const submission = await Submission.create({
        submission_url: submission_url,
        userId: userId,
        assignmentId: assignmentId,
      });
      const responseSubmission = { 
        submissionID:submission.id ,
        submissionUrl: submission_url,
        submissionDate: submission.submission_date,
        submissionUpdatedAt: submission.submission_updated
       };
      res.status(201).send(responseSubmission);
      const data = {
        first_name: req.User.first_name,
        last_name: req.User.last_name,
        submissionUrl: submission_url,
        userEmail: req.User.email,
        submission_date: submission.submission_date,
        assignment_name: assignmentRecord.name
      };

      AWS.config.update({
        region: 'us-east-1',
      });
      
      await snsNotification(data, "webapp");
    }
  } catch (error) {
    logErr(`Error in createSubmission:${error}`);
    res.sendStatus(400);
  }
}
};

const snsNotification = async (data, snsName) => {

  try {
    const sns = new AWS.SNS();
    const params = {
      Message: JSON.stringify(data),
      TopicArn: process.env.TOPICARN,
    };
    await sns.publish(params).promise();
    logInfo("Submission notification sent");
  } catch (err) {
    console.log(err);
    logErr(`Error in snsNotification: ${err}`);
  }
};

module.exports = {
  createSubmission,
};
