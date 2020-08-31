const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  timing: {
    type: String,
    required: true
  },

  birth: {
    type: Date
  }
});

module.exports = mongoose.model('Tickets', TicketSchema);