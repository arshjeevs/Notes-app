import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment"

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [UserInfo, setUserInfo] = useState(null);
  const [AllNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  
  const getAllNotes = async () => {
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/get-all-note", {
        headers: {
          Authorization: Authorization,
        },
      });

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error has occurred");
    }
  };

  const getUserInfo = async () => {
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/get-user", {
        headers: {
          Authorization: Authorization,
        },
      });
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);


  return (
    <>
      <Navbar UserInfo={UserInfo} />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-3 m-28">
          {AllNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              isPinned={item.isPinned}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10  "
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
          <AddEditNotes />
        </Modal>
      </div>
    </>
  );
};

export default Home;