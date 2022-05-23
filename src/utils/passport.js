const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


// Autenticación con Google
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

// Autenticación con Github
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_HOST}/api/users/github`,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
