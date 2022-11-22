import { Router, Request, Response } from "express";
import {CreateHandler, DeleteHandler, ReadAllHandler, ReadHandler, UpdateHandler} from "./authors-handlers";

const router = Router();

router.post("/create", CreateHandler);

router.get("/get", ReadHandler);

router.get("/", ReadAllHandler);

router.patch("/update", UpdateHandler);

router.delete("/delete", DeleteHandler);

export default router;
