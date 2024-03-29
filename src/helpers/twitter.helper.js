const Twitter = require("twitter");

console.log(
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  process.env.ACCESS_TOKEN_KEY,
  process.env.ACCESS_TOKEN_SECRET
);

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const postTwit = async (msg) => {
  const tweet = { status: msg };

  client.post("statuses/update", tweet, function (error, tweet) {
    if (error) {
      console.log(error);
    } else {
      console.log(tweet);
    }
  });
};

module.exports = { postTwit };
