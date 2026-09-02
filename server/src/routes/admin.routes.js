import express from "express";

import { createUser, deleteUser, getUsers, updateUser } from "../controllers/admin.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/users", authenticate, authorizeAdmin, getUsers);
router.post('/users', authenticate, authorizeAdmin, createUser);
router.put('/users/:id', authenticate, authorizeAdmin, updateUser);
router.delete('/users/:id', authenticate, authorizeAdmin, deleteUser);
export default router;