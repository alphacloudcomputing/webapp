const User = require('./users.js').User;
const Assignment = require('./assignments.js').assignment;

Assignment.belongsTo(User)