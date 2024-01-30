import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux';
import DashSidebar from '../Component/DashSidebar';
import DashProfile from '../Component/DashProfile';
import DashPosts from '../Component/DashPosts';
import DashUsers from '../Component/DashUsers';
import DashComments from '../Component/DashComment';
import DashComp from '../Component/DashComp';


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
      {tab==='posts'&&<DashPosts />}
      {tab==='users'&&<DashUsers />}
      {tab==='comments'&&<DashComments />}
      {tab==='dash'&& <DashComp/>}
    </div>
  )
}

