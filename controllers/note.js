import {Note} from '../models/note.js';
import ErrorHandler from '../middlewares/error.js';




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
        const notes = await Note.find({user:userid});
        if(notes.length === 0){
            return res.status(404).json({
                success:false,
                message:"Notes not found",
                data:[]
            })
        }
        await notes.deleteMany({});

        res.status(200).json({
            success:true,
            message:"Note deleted successfully",
            data:{}
        })
    } catch (error) {
        next(error)
    }

}