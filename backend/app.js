require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const session = require('express-session');

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json({
    limit: "50mb"
}))
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000
}))

app.use(session({
  secret: process.env.secret_key||'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const routes = require("./routes/index.js");
app.use("/", routes);

app.use('/public', express.static(path.join(__dirname, 'public')));

// CORS setup for dev
// app.use(function (req, res, next) {
//     req.client_ip_address = requestIp.getClientIp(req);
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
//     next();
// });

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.render("template/error-404");
  } else {
    console.log('\x1b[41m', err);
    let path = req.baseUrl + req.route && req.route.path;
    if (path.substr(path.length - 1) === '/') {
      path = path.slice(0, path.length - 1);
    }
    err.method = req.method;
    err.path = req.path;
    return res.render("template/error-500",err);
  }
});
module.exports = app;
