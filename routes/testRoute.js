// const mongoose = require("mongoose");
// const TestModel = mongoose.model("test");

module.exports = (app) => {
  app.get(`/test`, async (req, res) => {
    // try {
    //   const tests = await Test.find({});
    //   return res.send(tests);
    // } catch (error) {
    //   return res.send(error);
    // }

    return res.send("hello world");
  });

  // app.post(`/test/post`, async (req, res) => {
  //   try {
  //     const testPosted = new Test({
  //       thing: req.body.thing,
  //       otherThing: req.body.otherThing,
  //     });
  //     await testPosted.save();
  //     console.log("posting a new test:", testPosted);
  //     return res.send(testPosted);
  //   } catch (error) {
  //     console.log("hey there's an err", error);
  //     return res.send(error);
  //   }
  // });
};
