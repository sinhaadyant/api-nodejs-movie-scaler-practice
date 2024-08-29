const express = require("express");
const mongoose = require("mongoose");
const { checkForAuthentication } = require("./middlewares/auth");

const app = express();
const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blog");
mongoose
  .connect(
    "mongodb+srv://adyant:aDdJte2Aqh6BJ59M@cluster0.sbvx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((error) => {
    console.log(`Mongo DB connection error ${error}`);
  });

const PORT = 8080;
app.use(express.json());

app.use(checkForAuthentication);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/auth", authRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log("Server Started at" + PORT);
});
module.exports = app;
