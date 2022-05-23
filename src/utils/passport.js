const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Registrarse con Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_HOST}/api/users/google`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
