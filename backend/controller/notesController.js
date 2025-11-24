import Note from "../models/Note.js"

export const getNotes= async(req,res)=>{
    try {
        const notes=await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addNote=async(req,res)=>{
    try {
        const {title,content}=req.body
        const note=new Note({
            user:req.user,
            title,
            content
        })
        await note.save()

        res.status(200).json({
            message:"Note created successfullyyy!!!",
            note
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateNote=async(req,res)=>{
    try {
        const {id}=req.params
    const note=await Note.findOne({_id:id,user:req.user})
    
    if(!note){
        res.status(404).json({message:"Invalid note requested"})

    }
    note.title=req.body.title||note.title
    note.content=req.body.content||note.content
    await note.save()

    res.status(200).json({
        message:"Content is been updated!!!",
        note
    })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteNote=async(req,res)=>{
    try {
        const {id}=req.params
        const note=await Note.findOneAndDelete({_id:id,user:req.user})

        if(!note){
            return res.status(404).json({message:"Invalid note Requested for Deleting!!"})
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
    //   user: req.user.id
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching note" });
  }
};
