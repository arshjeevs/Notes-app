import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [Title, setTitle] = useState("" || noteData?.title);
  const [Content, setContent] = useState("" || noteData?.content);

  const [Error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/add-note",
        {
          title: Title,
          content: Content,
        },
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(response.data);
      if (response.data && response.data.note) {
        console.log("Note Added");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/edit-note/${noteId}`,
        {
          title: Title,
          content: Content,
        },
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (response.data && response.data.note) {
        console.log("Note Added");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!Title) {
      setError("Please enter title");
      return;
    }

    if (!Content) {
      setError("Please enter Content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 "
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
      </div>
      <input
        type="text"
        className="text-2xl text-slate-950 outline-none"
        placeholder="Go to Gym at 5"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="CONTENT"
          rows={10}
          value={Content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {Error && <p className="text-red-500 text-xs pb-1">{Error}</p>}

      <button
        className="btn-primary font-medium p-3 mt-2"
        onClick={handleAddNote}
      >
        {type === "edit" ? "EDIT" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
