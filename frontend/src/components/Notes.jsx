import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Notes = () => {
  const [notes,setNotes]=useState([])
  const fetchNotes=async(e)=>{
    // e.preventDefault()
    try {
      const token=localStorage.getItem("token")
      const res=await axios.get("http://localhost:8000/note/all",
        {headers:{ Authorization: `Bearer ${token}` }})
        // console.log("this is all notes data:   ",res.data);
        setNotes(res.data)
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong...");
      }
    }
    
  }
  useEffect(() => {
    fetchNotes();
  }, []);

 return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">All Notes</h1>
        <Link
          to="/note/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Note
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes?.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow p-4 rounded-lg border"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="text-gray-700 mt-2">{note.content}</p>

            <div className="mt-4 flex gap-2">
              <Link
                to={`/note/${note._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes