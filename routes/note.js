import express from 'express';
import  {isAuthenticated}  from '../middlewares/auth.js';
import { getNote, newNote, updateNote, deleteNote, deleteAll, getAllnotes, likeNote, unlikeNote, getLikedUsers, getDislikedUsers} from '../controllers/note.js';
//import { likeNote, unlikeNote } from '../controllers/like.js';



const router = express.Router();



// Like a note
router.put('/like/:id', isAuthenticated, likeNote);
// Unlike a note
router.put('/dislike/:id', isAuthenticated, unlikeNote);

// Fetch liked users for a note
router.get('/liked/:id/users', isAuthenticated, getLikedUsers);
// Fetch disliked users for a note
router.get('/disliked/:id/users', isAuthenticated, getDislikedUsers);


router.get('/all', getAllnotes)
router.post('/newnote',isAuthenticated,  newNote, )
router.get('/my',isAuthenticated, getNote)
router.delete('/deleteall',isAuthenticated, deleteAll)
//router.post('/like/:id', isAuthenticated, likes);
router.route("/:id")
.put(isAuthenticated, updateNote)
.delete(isAuthenticated,deleteNote)

export default router;