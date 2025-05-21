const mongoose = require('mongoose');
const DB = process.env.DATABASE_URI;

mongoose.connect(DB).then(() => {
  console.log('Connection to Database has been established successfully');
}).catch((error) => {
  console.log('Error connection to Database', error.message);
});