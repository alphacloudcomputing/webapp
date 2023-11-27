const User = require('./users.js').User;
const Assignment = require('./assignments.js').assignment;
const Submission = require('./submission.js').submission;

User.hasMany(Assignment);
User.hasMany(Submission);
Assignment.hasMany(Submission, {
    onDelete: "cascade",
    hooks: true
});