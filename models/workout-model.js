const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/workout-log", {
  useNewUrlParser: true
});
const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userID: { type: Number, required: true }
});
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout };
