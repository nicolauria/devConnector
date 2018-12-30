const express = require('express');
const app = express();

// connect express server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));

// connect to mongoDB
const mongoose = require('mongoose');
const db = require('./config/keys.js').mongoURI;
mongoose.connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

// serve static assets if in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// parse body of post requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// passport middleware
const passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());
