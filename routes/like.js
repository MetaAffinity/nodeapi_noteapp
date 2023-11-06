// likeRoutes.js
import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { likeNote, unlikeNote } from '../controllers/like.js';

const router = express.Router();

// Like a note
router.post('/like/:id', isAuthenticated, likeNote);

// Unlike a note
router.delete('/unlike/:id', isAuthenticated, unlikeNote);

export default router;
