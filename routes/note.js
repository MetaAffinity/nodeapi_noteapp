import express from 'express';
import  {isAuthenticated}  from '../middlewares/auth.js';
import { getNote, newNote, updateNote, deleteNote } from '../controllers/note.js';

const router = express.Router();

router.post('/newnote',isAuthenticated, newNote, )
router.get('/my',isAuthenticated, getNote)
router.route("/:id")
.put(isAuthenticated, updateNote)
.delete(isAuthenticated,deleteNote)

export default router;