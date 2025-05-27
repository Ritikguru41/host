// const mongoose = require('mongoose');

// const passwordSchema = new mongoose.Schema({
//   currentPassword: String,
//   newPassword: String
// });

// module.exports = mongoose.model('Password', passwordSchema);


const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  currentPassword: {
    type: String,
    required: true
  },
  newPassword: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Password', passwordSchema);

