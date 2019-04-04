const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production"; // true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); // part of next config

// mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/workout-log", {
  useNewUrlParser: true,
});
const { Workout } = require("./models/workout-model");
const { User } = require("./models/user.js");
// middleware
const { authenticate } = require("./middleware/authenticate.js");

nextApp.prepare().then(() => {
  // express code here
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // WORKOUT ROUTES
  app.post("/api/save-workout", (req, res) => {
    const { title, body, userID } = req.body;
    const newWorkout = new Workout({
      title,
      body,
      userID,
    });
    newWorkout.save(err => {
      if (err) return res.send(err);
      return res.send(newWorkout);
    });
  });

  app.get("/api/get-workout", (req, res) => {
    const { userID } = req.query;
    Workout.find({ userID }, (err, records) => {
      if (err) return res.send(err);
      res.send(records);
      return records;
    });
  });

  app.post("/api/new-user", async (req, res) => {
    try {
      const { email, password } = req.body;
      const newUser = new User({
        email,
        password,
      });
      const savedUser = await newUser.save();
      const token = await savedUser.generateAuthToken();
      if (savedUser) {
        res.send(token);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post("/api/login", async (req, res) => {
    console.log(req);
    const { email, password } = req.body;
    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      if (user) {
        res.cookie("x-auth", token).sendStatus(200);
      }
    } catch (e) {
      res.status(400).send("error" + e);
    }
  });

  // FRONT END ROUTES
  app.get("*", (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
