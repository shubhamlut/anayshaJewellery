const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://shubhamlutade:980598@cluster0.rxgyord.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  let a = mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    { useUnifiedTopologu: true }
  );

  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected Succesfully");
  });
};

//a.then(console.log('Success')).catch(err)
module.exports = connectToMongo;
