import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux';
import DashSidebar from '../Component/DashSidebar';
import DashProfile from '../Component/DashProfile';
import DashPosts from '../Component/DashPosts';


export default function Dashboard() {
  const location=useLocation();
  const [tab,setTab]=useState('');
  
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab');
    setTab(tabFromUrl);
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar/>
      </div>
      {tab==='profile'&&<DashProfile />}
      {tab==='posts'&&<DashPosts/>}
    </div>
  )
}

