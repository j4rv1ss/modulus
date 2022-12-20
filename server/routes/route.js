import express from "express";
import { getUser, login, logout, signup, updateUser } from "../controllers/User.js";

import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.get("/logout", logout)

router.post("/update",isAuthenticated, updateUser )

router.get("/getUser",isAuthenticated, getUser)


export default router