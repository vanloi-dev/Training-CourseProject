const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const passport = require("passport");

//Bring in the app constants
const { DB, PORT } = require("./config/app");

//Initialize the application
const app = express();
const accountRoute = require("./routes/user");
const staffRoute = require("./routes/staff");
const trainerRoute = require("./routes/trainer");
const traineeRoute = require("./routes/trainee");
const categoryRoute = require("./routes/category");
const courseRoute = require("./routes/course");
const topicRoute = require("./routes/topic");
//Middlewares

var corsOptions = {
  origin: "http://localhost",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./middlewares/passport")(passport);

app.use("/api", accountRoute);
app.use("/staff", staffRoute);
app.use("/trainer", trainerRoute);
app.use("/trainee", traineeRoute);
app.use("/category", categoryRoute);
app.use("/course", courseRoute);
app.use("/topic", topicRoute);

const startApp = async () => {
  try {
    //Connection with DB
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });
    //Starting listening for the server on PORT
    app.listen(PORT, () => {
      success({ message: `Server started on PORT ${PORT}`, badge: true });
    });
  } catch (error) {
    error({
      message: `Unable to connected with the Database \n${DB}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
