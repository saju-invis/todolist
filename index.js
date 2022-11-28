const express = require('express');
require('dotenv').config();
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
//const cors = require('cors');
const passport = require('passport');
//const crypto = require('crypto');
const db = require('./models');

//const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());

(async () => {
  try {
    await db.sequelize.authenticate();

    const PORT = process.env.APP_PORT;
    const IN_PROD = process.env.NODE_ENV === 'production';
    const TWO_HOURS = 1000 * 60 * 60 * 2;
    const options = {
      connectionLimit: 10,
      password: process.env.DB_PASS,
      user: process.env.DB_USER,
      database: process.env.MYSQL_DB,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      createDatabaseTable: true,
    };

    const sessionStore = new mysqlStore(options);

    app.use(
      session({
        name: process.env.SESS_NAME,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        secret: process.env.SESS_SECRET,
        cookie: {
          maxAge: TWO_HOURS,
          sameSite: true,
          secure: IN_PROD,
        },
      })
    );

    require('./config/passport');

    app.use(passport.initialize());
    app.use(passport.session());

    const userRouter = require('./routes/user');
    const todoRouter = require('./routes/todos');

    app.use('/api/users/', userRouter);
    app.use('/api/todos/', todoRouter);

    /* app.use((req, res, next) => {
      console.log(req.session);
      console.log(req.user);
  }); */

    app.listen(PORT, () => {
      console.log(`server is listening on ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
