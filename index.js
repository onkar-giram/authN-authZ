const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const user = require("./routes/user");
app.use("/api/v1", user);

//connect db
require("./config/database").connectDB();

app.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`);
});
