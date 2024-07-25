import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment"
import Toast from "../../components/Toast/Toast";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [UserInfo, setUserInfo] = useState(null);
  const [AllNotes, setAllNotes] = useState([]);
  const [ToastMsg, setToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  })
  const navigate = useNavigate();
  
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    })
  };

  const handleCloseToast = () => {
    setToastMsg({
      isShown: true,
      message: "",
    })
  }

  const handleShowToast = (message, type) => {
    setToastMsg({ 
      isShown: false,
      message,
      type
    })
  }

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

  const deleteNote = async (noteData) => {
    const noteId = noteData._id
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/delete-note/${noteId}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (response.data && response.data.note) {
        handleShowToast("Note Deleted Successfully", 'delete')
        getAllNotes();
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
  }

  const handlePinNote = async (noteData) => {
    const noteId = noteData._id
    let Pinned = true
    if( !noteData.isPinned ){
      Pinned = false
    }
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/edit-note/${noteId}`,
        {
          title: noteData.title,
          content: noteData.Content,
          isPinned: Pinned,
        }
      );
      console.log(response.data)
      if (response.data && response.data.note) {
        handleShowToast("Note Updated SUccessfully")
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
  }

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
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => handlePinNote(item)}
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
          <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          onClose={ () => {
            setOpenAddEditModal({isShown: false, type: "add" , data: null})
          }}
          handleShowToast={handleShowToast}
          />
        </Modal>
        <Toast 
          isShown={ToastMsg.isShown}
          type={ToastMsg.type}
          message={ToastMsg.message}
          onClose={handleCloseToast}
        />
      </div>
    </>
  );
};

export default Home;
