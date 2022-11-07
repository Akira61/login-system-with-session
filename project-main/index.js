// libraires
// npm i before running the code to loade node_modules
const express = require("express");
const app = express();
const registerUser = require('./routes/register');
const signinUser = require('./routes/signin');
const LoggedIn = require('./routes/loggedin');

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./");

// Declare  routes
app.get("/", function (req, res) {
  res.render('./mongoose/views/index.ejs');
});

app.get('/secret',LoggedIn, (req, res) => {
  res.send('you have now access to the secret page!');
})
app.use('/signup', registerUser);
app.use('/signin', signinUser);

// Run the server!
app.listen(3000, function (err) {
  if (err) throw err;
  console.log(`Server is now listening on 3000`);
});
