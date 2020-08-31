const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv/config');

//Middleware;
app.use(bodyParser.json());

//Connection to DB
//Create a .env file and add the URL to your MongoDBAtlas
//env file was created for security purposes
mongoose.connect(
  process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log('Connected Successfully')
);

// Using node-cron to delete tickets that are older than 8 hours

cron.schedule('* */8 * * *', async () => {
  try {
    const result = await Ticket.find({
      birth: {
        $lt: new Date() - 8 * 60 * 60 * 1000,
      },
    });
    if (Array.isArray(result) && result.length > 0) {
      const pathtofile = path.resolve(__dirname, 'logs', 'logs.txt');
      const log = fs.createWriteStream(pathtofile, {
        flags: 'a',
      });

      log.write(JSON.stringify(result, undefined, 2) + '\n', (error) => {
        if (error) console.log(error.message);
      });
      log.end();

      await Ticket.deleteMany({
        birth: {
          $lt: new Date() - 8 * 60 * 60 * 1000,
        },
      });
      console.log('Old Tickets Deleted');
    }
  } catch (error) {
    console.log(error.message);
  }
});

//Initialize Routes
const TicketRoute = require('./routes/tickets');
app.use('/tickets', TicketRoute);

//ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the backend of our booking site');
});

//Port number where the program will run. You can change this later
app.listen(4000);