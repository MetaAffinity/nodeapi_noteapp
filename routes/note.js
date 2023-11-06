import express from 'express';
import  {isAuthenticated}  from '../middlewares/auth.js';
import { getNote, newNote, updateNote, deleteNote, deleteAll, getAllnotes, likes } from '../controllers/note.js';



const router = express.Router();



router.get('/all', getAllnotes)
router.post('/newnote',isAuthenticated,  newNote, )
router.get('/my',isAuthenticated, getNote)
router.delete('/deleteall',isAuthenticated, deleteAll)
router.put('/like/:id',isAuthenticated, likes)
router.route("/:id")
.put(isAuthenticated, updateNote)
.delete(isAuthenticated,deleteNote)

export default router;