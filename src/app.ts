import express, { Express, Request, Response } from 'express';
import { default as userRoutes } from "./routes/app.routes";
import bodyParser from "body-parser";
var cors = require('cors');
const app: Express = express();
const allowCrossDomain = function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(cors({
  origin: function(origin, callback){ 
    return callback(null, true);
  },
  credentials: true,
}));
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/authors", userRoutes);

export default app;
