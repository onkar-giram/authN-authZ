const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database up and running"))
    .catch((err) => {
      console.log(`error at database connection: ${err}`);
      process.exit(1);
    });
};
