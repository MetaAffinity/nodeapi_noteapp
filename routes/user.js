import express from 'express';
import { allUsers, login, logout, myProfile, register } from '../controllers/user.js';
import  {isAuthenticated}  from '../middlewares/auth.js';

const router = express.Router();

router.get("/all",allUsers)
router.post('/register', register);
router.post("/login",login);
router.get("/me", isAuthenticated, myProfile)
router.get("/logout", logout)

export default router;