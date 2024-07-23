import React from 'react'
import { getinitials } from '../../utils/helper'

const ProfileInfo = ({ UserInfo, onLogout }) => {
  return (
    <div className='flex gap-3'>
        <div className='w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-slate-950 font-medium'>
            {getinitials("john williams")}
        </div>
            
        <div>
            <p className='text-sm font-medium'>William</p>
            <button className='text-sm text-slate-700 underline' onClick={onLogout}>Logout</button>
        </div>
        
    </div>
  )
}

export default ProfileInfo