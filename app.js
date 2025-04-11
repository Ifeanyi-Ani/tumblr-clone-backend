const express = require("express");
const App = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const globalErr = require("./controllers/errController");

const corsOption = require("./config/corsOption");

const credentials = require("./middleware/corsCredentials");

const AppErr = require("./utils/appErr");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comments");
const likeRoute = require("./routes/likes");

App.use(helmet());
App.use(credentials);
App.use(cors(corsOption));

App.use(express.static(path.join(__dirname, "public")));
App.use(bodyParser.json());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(morgan("dev"));

App.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

App.use(likeRoute);
App.use("/users", userRoute);
App.use("/auth", authRoute);
App.use("/posts", postRoute);
App.use("/comments", commentRoute);

App.all("*", (req, res, next) => {
  next(new AppErr(`Can't find ${req.originalUrl} on this server!`, 404));
});
App.use(globalErr);

module.exports = App;
