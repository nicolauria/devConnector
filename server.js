const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('hello world'));

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));

const mongoose = require('mongoose');
const db = require('./config/keys.js').mongoURI;
mongoose.connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));
