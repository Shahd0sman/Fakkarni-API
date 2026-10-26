// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// const AppDataSource = require("./database/data-source");
// const app = require("./app");
// const startReminderScheduler = require("./services/reminder-scheduler.service");

// AppDataSource.initialize()
//   .then(() => {
//     console.log("data server has been connected...");
//   })
//   .catch((err) => {
//     console.log("data server connection error => ", err);
//   });

// startReminderScheduler();

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`server running on ${port}...`);
// });

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const AppDataSource = require("./database/data-source");
const app = require("./app");
const startReminderScheduler = require("./services/reminder-scheduler.service");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    startReminderScheduler();

    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
}

startServer();
