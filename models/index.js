/* -------------------------------------------------------------------------- */
/*                              Required Modules                              */
/* -------------------------------------------------------------------------- */
const mongoose = require('mongoose');
/* ------------------------ Create connection string ------------------------ */
const connectionString = 'mongodb://localhost:27017/moviedb';
/* ------------------ connect and hide deprecation warnings ----------------- */
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    });
/* --------------- Listen for connection and callback function -------------- */
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
  });
  
  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB!", err);
  });

/* --------------------------- Export data modules -------------------------- */
module.exports = {
    Movies: require('./Movies.js')
    }
    


    