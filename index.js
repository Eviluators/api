const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');

// Get app config vars
const config = require('./config');

const server = express();

// enable JSON body parser
server.use(bodyParser.json());

// enable cors (required for heroku)
const corsOptions = {}; // CORS options placeholder
server.use(cors());

// enable helmet to obfuscate server response headers
server.use(helmet());
//developer.github.com/v3/repos/hooks/
// Routes (should probably be broken up and moved to seperate file(s))

https: // Endpoint for github hooks
server.post('/submission/pr', async (req, res) => {
  try {
    const testSubmission = {
      url: req.body.pull_request.head.repo.html_url,
      _id: req.body.pull_request.head.repo.id
    }
    await axios.post('http://localhost:3434/new-test', { testSubmission });
    res.json(req.body);
  } catch (error) {
    res.json(error);
  }
});


server.get('/submission/:id', (req, res) => {
  const { id } = req.params;
  // TODO: not sure if this is still needed if we are removing mongo
});

// TODO: Connect to mongo (should probably be moved to seperate file(s))

// Start server
server.listen(config.PORT, error => {
  if (error) return console.log(error);
  console.log(`Eviluators-API server running on port ${config.PORT}`);
});
