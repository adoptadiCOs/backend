const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Registrarse
//Get the "profile" info of the "authorized user". Pass this "profile" to the passport.serialize()
passport.use(
  "signup-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/users/signup/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// Iniciar Sesion
passport.use(
  "login-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/users/login/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
