const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/users");

//connecting to database
mongoose.connect("mongodb://localhost/loginapp");
const db = mongoose.connection;

//adding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//starts passport session
app.use(passport.initialize());
app.use(passport.session());

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

require("./routes/api/index");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // Send every request to the React app
// Define any API routes before this runs
  // app.get("*", function(req, res) {
  //   res.sendFile(path.join(__dirname, "./client/build/index.html"));
  // });
}


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
