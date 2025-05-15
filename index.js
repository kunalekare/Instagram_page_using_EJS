const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true })); // For parsing form data

let reels = []; // Global array to store reels

app.get('/', (req, res) => {
  res.render("home.ejs");
});

app.get('/ig/:username', (req, res) => {
  // const follower=["John", "Doe", "Jane", "Smith"];
  // let { username } = req.params;
  let { username } = req.params;
  const instaData=require("./data.json");
 // console.log(instaData);
  const data=instaData[username];
  if (!data) {
  return res.status(404).send("User not found");
}
  console.log(data);
  res.render("Instagram2.ejs",{data});

  // res.render("Instagram.ejs", { username, reels,follower }); // Pass reels to template
});

app.post('/reels', (req, res) => {
  const { title, description, username } = req.body;
  reels.push({ title, description });
  res.redirect(`/ig/${username}`); // Redirect with actual username
});

app.get('/hello', (req, res) => {
  res.send("hello");
});

app.get('/rolldice', (req, res) => {
  let diceval = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { diceval});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
