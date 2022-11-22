import express, { Express, Request, Response } from 'express';
import { default as userRoutes } from "./routes/app.routes";
import bodyParser from "body-parser";
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/authors", userRoutes);

export default app;
