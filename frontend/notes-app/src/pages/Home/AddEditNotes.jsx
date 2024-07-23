import React, { useState } from "react";
import { MdClose } from "react-icons/md";
const AddEditNotes = () => {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
      </div>
      <input
        type="text"
        className="text-2xl text-slate-950 outline-none"
        placeholder="Go to Gym at 5"
        value={Title}
        onChange={({ target }) => setTitle(e.target.value)}
      />
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="CONTENT"
          rows={10}
          value={Content}
          onChange={({ target }) => setContent(e.target.value)}
        ></textarea>
      </div>

      <button className="btn-primary font-medium p-3 mt-2">ADD</button>
    </div>
  );
};

export default AddEditNotes;
