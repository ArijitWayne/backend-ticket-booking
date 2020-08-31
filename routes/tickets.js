const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

//Show all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Query 1: Book a ticket
router.post('/', async (req, res) => {
  try {
    const {
      name,
      phone,
      timing
    } = req.body;
    const tickets = await Ticket.find({
      timing
    });
    if (tickets.length >= 20) {
      return res.status(400).json({
        msg: 'No more tickets can be booked for this time slot'
      });
    }


    const newTicket = {
      name,
      phone,
      timing,
      birth: new Date(timing.split(' ').join('T'))
    }

    const ticket = new Ticket(newTicket);
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Query 2: Update timing of a Specific ticket
router.patch('/:ticketId', async (req, res) => {
  try {
    const updatedTicket = await Ticket.updateOne({
      _id: req.params.ticketId,
    }, {
      $set: {
        timing: req.body.timing,
      },
    });
    res.json(updatedTicket);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//Query 3: Gets back all tickets for a particular timing
router.get('/:ticketId', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    res.json(ticket);
  } catch (err) {
    res.json({
      message: err
    });
  }
});


//Query 4: Delete Specific ticket
router.delete('/:ticketId', async (req, res) => {
  try {
    const removedTicket = await Ticket.remove({
      _id: req.params.ticketId,
    });
    res.json(removedTicket);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//Query 5: Show user details based on ticket_id
router.get('/:ticketId', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    res.json(ticket);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;