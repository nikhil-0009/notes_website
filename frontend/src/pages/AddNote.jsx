import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")

    const navigate = useNavigate();
    const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/note/add",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Note added!");
      navigate("/note/all");
    } catch (error) {
      alert("Failed to add note");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleAddNote}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="w-full p-3 mb-4 border rounded"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote