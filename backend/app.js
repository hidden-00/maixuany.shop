const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const requestIp = require("request-ip");
const path = require("path");

const app = express();

app.use(bodyParser.json({
    limit: "50mb"
}))
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000
}))

app.set('view engine', 'ejs');

//app.get("/",(req, res)=>{
//    res.render("index");
//})

const routes = require("./routes/index.js");
app.use("/", routes);

app.use('/public', express.static(path.join(__dirname, 'public')));

// CORS setup for dev
app.use(function (req, res, next) {
    req.client_ip_address = requestIp.getClientIp(req);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
    next();
});

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
    return res.render("template/error-500");
  }
});
module.exports = app;
