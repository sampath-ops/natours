const mongoose = require('mongoose');
const dotenv = require('dotenv');
// ADD TO ENVIRONMENT VARIABLES
dotenv.config({ path: './config.env' });

// UNCAUGHT_EXCEPTION
process.on('unhandledException', (err) => {
  console.log('uncaughtException! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//GET CONNECTION STRING
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//CONNECT TO CLOUD DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected successfully!!!'));

// // CREATE A DOCUMENT
// const tourTest = new Tour({
//   name: 'The forest hiker',
//   rating: 4.7,
//   price: 497,
// });

// // SAVE TO DATABASE
// tourTest
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error:', err);
//   });

// START SERVER
const app = require('./app');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

// UNHANDLED_REJECTION
process.on('unhandledRejection', (err) => {
  server.close(() => {
    process.exit(1);
  });
});

//documentation link
// https://documenter.getpostman.com/view/14346585/TzeWFT6C#8ba86167-a4a6-4ef1-874a-3cb2cce0baf7
