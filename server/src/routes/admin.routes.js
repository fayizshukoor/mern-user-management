import express from "express";

import { getUsers } from "../controllers/admin.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/users", authenticate, authorizeAdmin, getUsers);

export default router;