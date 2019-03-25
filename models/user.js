const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userID: mongoose.Schema.Types.ObjectId,
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// UserSchema.methods.toJSON = function() {
//   const user = this;
//   const userObject = user.toObject();
//   return _.pick(userObject, ["_id", "email"]);
// };

// reminder - arrow functions do not bind this keyword
// schema methods are per instance
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "caley")
    .toString();
  user.tokens = user.tokens.concat({ access, token });
  return user.save().then(() => {
    return token;
  });
};

// // remove token for logout
// UserSchema.methods.removeToken = function(token) {
//   const user = this;

//   return user.update({
//     // use the mongodb pull operator
//     $pull: {
//       tokens: {
//         token: token
//       }
//     }
//   });
// };

// // schema statics are per model
// UserSchema.statics.findByToken = function(token) {
//   const User = this;
//   const decoded;

//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (e) {
//     return new Promise((resolve, reject) => {
//       reject();
//     });
//   }
//   return User.findOne({
//     _id: decoded._id,
//     "tokens.token": token,
//     "tokens.access": "auth"
//   });
// };

// function to find user on login
UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({ email })
    .then(user => {
      // if user is not found
      if (!User) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        // verify password inside here
        // use bcrypt.compare
        bcrypt.compare(password, user.password, function(err, res) {
          if (res) {
            resolve(user);
          } else {
            reject(res);
          }
        });
      });
    })
    .catch(e => {
      reject(e);
    });
};

// // middleware to be executed before each save event
UserSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("Users", UserSchema);

module.exports = { User };
