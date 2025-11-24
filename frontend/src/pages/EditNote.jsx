import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch existing note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/note/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTitle(res.data.note.title);
        setContent(res.data.note.content);
      } catch (error) {
        alert("Failed to fetch note details");
      }
    };

    fetchNote();
  }, [id]);

  const handleEditNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/note/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Note updated!");
      navigate("/note/all");
    } catch (error) {
      alert("Error updating note");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleEditNote}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="content"
          className="w-full p-3 mb-4 border rounded"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditNote;
