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
      // Comprueba si el usuario existe
      const user = await User.findOne({ googleId: profile.id });
      //lo creamos
      if (user) {
        done(null, false);
      } else {
        await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        });

        done(null, profile);
      }
    }
  )
);

// Iniciar Sesion
passport.use(
  "sign-in-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/users/login/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // si existe en la base de datos
      const user = {};
      //  puede iniciar sesion
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  )
);
