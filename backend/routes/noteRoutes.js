import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { addNote, deleteNote, getNotes, getSingleNote, updateNote } from "../controller/notesController.js";

const notesRouter= express.Router();


notesRouter.get('/all',getNotes);
notesRouter.post('/add',authMiddleware,addNote);
notesRouter.get('/:id', authMiddleware, getSingleNote);
notesRouter.put('/:id',authMiddleware,updateNote);
notesRouter.delete('/:id',authMiddleware,deleteNote);

export default notesRouter