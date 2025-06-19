const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const EditorRouter = require('./Editor.js');
const AdminRouter = require('./Admin.js')
const compression = require("compression")
const path = require('path')
const mongoose = require('mongoose');
const app = express();
require('colors')
require('dotenv').config();


// static file serve
app.use(express.static(path.join(__dirname, 'public')))



app.use(bodyParser.urlencoded({extended: true}))
app.use(compression())
app.use(express.json());
app.use(cors());
app.use(EditorRouter);
app.use(AdminRouter);





// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'.green.bold))
  .catch(err=> console.log(err));


  const PORT = 5000 || process.env.PORT
app.listen( PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});