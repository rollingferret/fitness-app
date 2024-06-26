// const express = require("express");
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const app = express();
// const passport = require('passport');
// app.use(passport.initialize());

// const cors = require('cors');
// const csurf = require('csurf');
// const { isProduction } = require('./config/keys');

// require('./models/User');
// require('./models/Run');
// require('./config/passport');

// const usersRouter = require('./routes/api/users');
// const runsRouter = require('./routes/api/runs');
// const csrfRouter = require('./routes/api/csrf');


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Security Middleware
// if (!isProduction) {
//   // Enable CORS only in development because React will be on the React
//   // development server (http://localhost:3000). (In production, React files
//   // will be served statically on the Express server.)
//   app.use(cors());
// }

// // Set the _csrf token and create req.csrfToken method to generate a hashed
// // CSRF token
// app.use(
//   csurf({
//     cookie: {
//       secure: isProduction,
//       sameSite: isProduction && "Lax",
//       httpOnly: true
//     }
//   })
// );

// // Attach Express routers
// app.use('/api/users', usersRouter);
// app.use('/api/runs', runsRouter);
// app.use('/api/csrf', csrfRouter);

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.statusCode = 404;
//   next(err);
// });

// const serverErrorLogger = debug('backend:error');

// // Express custom error handler that will be called whenever a route handler or
// // middleware throws an error or invokes the `next` function with a truthy value
// app.use((err, req, res, next) => {
//   serverErrorLogger(err);
//   const statusCode = err.statusCode || 500;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     statusCode,
//     errors: err.errors
//   })
// });

// module.exports = app;


const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');
const csurf = require('csurf');
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');

/* --- Need to import these to load the models into mongoose --- */
require('./models/User');
require('./models/Run');
/* ------------------------------------------------------------- */
require('./config/passport'); // Need to import to configure passport module
const passport = require('passport');

const { isProduction } = require('./config/keys');

const app = express();

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(logger('dev')); // log request components (URL/method) to terminal
app.use(express.json()); // parse JSON request body
app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
app.use(cookieParser()); // parse cookies as an object on req.cookies

app.use(passport.initialize()); // make Express use passport for authentication

// Security Middleware
if (!isProduction) {
  // enable CORS only in development because React will be on the React
  // development server (http://localhost:3000)
  // (In production, React files will be served statically on the Express server)
  app.use(cors());
}

// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// app.get("/", (req, res) => res.send("Hello World!!"));

// Attach Express routers
const runsRouter = require('./routes/api/runs');
const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');
app.use('/api/runs', runsRouter);
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);

// Serve static React build files statically in production
if (isProduction) {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug('backend:error');
// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors
  })
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
