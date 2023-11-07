import {Note} from '../models/note.js';
//import  Like from '../models/like.js';
import ErrorHandler from '../middlewares/error.js';
//import * as next from 'next';




export const newNote = async (req, res, next) => {
    try {
            const {title, description} = req.body;
            
            await Note.create({
                title,
                description,
                user:req.user,
            })
        
            res.status(201).json({
                success:true,
                message:"Note created successfully"
            })
    } catch (error) {
        next(error)
    }
    

}

export const getNote = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const notes = await Note.find({user:userid})

        res.status(200).json({
            success:true,
            notes,
        })

    } catch (error) {
        next(error)
    }
}

export const getAllnotes = async (req, res) =>{
    const notes = await Note.find(); //  .populate('user')  for  get user name from user collection 
    
    //if(!notes) return next(new ErrorHandler("Notes not found",404))
    
    
    res.status(200).json({
        success: true,
        notes
    })
}

export const updateNote = async (req, res, next) => {
    try {
        const {title, description} = req.body;
        const note = await Note.findById(req.params.id);

        if(!note) return next(new ErrorHandler("Note not found",404))

        note.title = title;
        note.description = description;
        await note.save();

        res.status(200).json({
            success:true,
            message:"Note updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if(!note) return next(new ErrorHandler("Note not found",404))

        await note.deleteOne();

        res.status(200).json({
            success:true,
            message:"Note deleted successfully"
        })
    } catch (error) {
        next(error)
    }

}

export const deleteAll = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const result = await Note.deleteMany({ user: userid })
        
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found",
                data: []
            });
        }

        res.status(200).json({
            success:true,
            message:"Note deleted successfully",
            data:{}
        })
    } catch (error) {
        next(error)
    }

}

// export const likes = async (req,res, next) =>{
//     try {
//         const note = await Note.findById(req.params.id);
    
//         if(!note) return next(new ErrorHandler("Note not found",404))
    
//         // check if note is already liked
//         if(note.likes.filter(like=>like.user.toString() === req.user.id).length > 0) {
//             return next(new ErrorHandler("Note already liked",400))
//         }
//         note.likes.unshift({user:req.user.id});
    
//         // note.likes = note.likes + 1;
//         await note.save();
    
//         res.json(note.likes);
    
//     } catch (error) {
//         console.log(error);
//         //res.status(500).send("Error saving")
//         next(error)
//     }


// }





// Like a note
export const likeNote = async (req, res, next) => {
    try {
      const note = await Note.findById(req.params.id);
  
      if (!note) {
        return next(new ErrorHandler('Note not found', 404));
      }
  
      // Check if the user has already liked the note
      const existingLike = await Like.findOne({ user: req.user.id, note: req.params.id });
  
      if (existingLike) {
        return next(new ErrorHandler('Note already liked', 400));
      }
  
      // Create a new Like entry
      const like = new Like({ user: req.user.id, note: req.params.id });
  
      await like.save();
  
      // Add the like reference to the note
      note.likes.push(like);
      await note.save();
  
      res.json({ success: true, message: 'Note liked' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  // Unlike a note
  export const unlikeNote = async (req, res, next) => {
    try {
      const note = await Note.findById(req.params.id);
  
      if (!note) {
        return next(new ErrorHandler('Note not found', 404));
      }
  
      // Check if the user has liked the note
      const existingLike = await Like.findOneAndDelete({ user: req.user.id, note: req.params.id });
  
      if (!existingLike) {
        return next(new ErrorHandler('Note not liked', 400));
      }
  
      // Remove the like reference from the note
      note.likes = note.likes.filter(like => like.toString() !== existingLike._id.toString());
      await note.save();
  
      res.json({ success: true, message: 'Note unliked' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  export const getLikedUsers = async (req, res) => {
    try {
      const noteId = req.params.id;
  
      const note = await Note.findById(noteId).populate('likes', 'name'); // Assuming 'name' is a field in the User model
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      if (note.likes && note.likes.length > 0) {
        const likedUserNames = note.likes.map((like) => like.name);
        res.json({ success: true, likedUsers: likedUserNames });
      } else {
        res.json({ success: true, likedUsers: [] });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  
  
  // Fetch disliked users for a note
  export const getDislikedUsers = async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const note = await Note.findById(noteId).populate('dislikes', 'name'); // Assuming 'username' is a field in the User model
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

  
      res.json({ dislikedUsers: note.dislikes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  // liked users
//   export const getLikedUsers = async (req, res, next) => {
//     try {
//       const note = await Note.findById(req.params.id);
  
//       if (!note) {
//         return next(new ErrorHandler('Note not found', 404));
//       }
  
//       const likedUsers = note.likes.map(like => like.user);
      
  
//       res.json({ success: true, likedUsers });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }

//   }

//   export const getDislikedUsers = async(req, res, next) => {
//     try {
//         const note = await Note.findById(req.params.id);
  
//         if (!note) {
//           return next(new ErrorHandler('Note not found', 404));
//         }
  
//         const dislikedUsers = note.dislikes.map(dislike => dislike.user);
  
  
//         res.json({ success: true, dislikedUsers });
//       }
        
//      catch (error) {
        
//     }
//   }





// export const likeNote = async (req, res) => {
//     try {
//         const note = await Note.findById(req.params.id);

//         if(note.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
//             return res.status(400).json({
//                 success:false,
//                 message:"Note already liked"
//             })
        
//         }

//         note.likes.unshift({user:req.user.id});

//         await note.save();
//         res.json(note.likes);
//     } catch (error) {
//         console.log(error.message)
//             res.status(500).send("server errror")
        
//     }

// }