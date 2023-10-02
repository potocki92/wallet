const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);
