import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment"
const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-lg transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format('DD-MM-YYYY')}</span>
            </div>

            <MdOutlinePushPin className={`icon-primary ${isPinned ? "text-primary" : "text-slate-300"}`} onClick={onPinNote}/>
        </div>  
        <p className='text-xs mt-2 text-slate-600'>{content?.slice(0,60)}</p>
        <div className='flex justify-between items-center mt-2'>
            <div className='text-xs text-slate-500'>{tags}</div>
            <div className='flex items-center gap-2'>
                <MdCreate className='icon-btn hover:text-green-500'></MdCreate>
                <MdDelete className='icon-btn hover:text-red-600'></MdDelete>
            </div>
        </div>
        
    </div>
  )
}

export default NoteCard