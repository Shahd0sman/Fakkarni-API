// const { DataSource } = require("typeorm");
// const User = require("../entities/user.entity");
// const Document = require("../entities/document.entity");
// const Bill = require("../entities/bill.entity");
// const Reminder = require("../entities/reminder.entity");
// const Notification = require("../entities/notification.entity");

// const dataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USERNAME || "postgres",
//   password: String(process.env.DB_PASSWORD || ""),
//   database: process.env.DB_DATABASE || "fakarny_db",
//   synchronize: true,
//   logging: false,

//   entities: [User, Document, Bill, Reminder, Notification],
// });

// module.exports = dataSource;

const { DataSource } = require("typeorm");
const pg = require("pg");

const User = require("../entities/user.entity");
const Document = require("../entities/document.entity");
const Bill = require("../entities/bill.entity");
const Reminder = require("../entities/reminder.entity");
const Notification = require("../entities/notification.entity");

const dataSource = new DataSource({
  type: "postgres",
  driver:pg,
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
  synchronize: true,
  logging: false,

  entities: [User, Document, Bill, Reminder, Notification],
});

module.exports = dataSource;
