import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import {FaBookmark} from 'react-icons/fa';
import { useDispatch,useSelector } from "react-redux";
import {
 signOutUserSuccess
} from "../redux/user/userSlice";


export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState("");
    const dispatch=useDispatch();
    const {currentUser}=useSelector(state=>state.user);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      setTab(tabFromUrl);
    }, [location.search]);

    const handleSignout=async()=>{
      try {
        const result=await fetch(`/api/user/signout`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data=await result.json();
        if (result.ok) {
          dispatch(signOutUserSuccess());
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  
    return (
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser.isAdmin&&(
              <Sidebar.Item
              active={tab === "dash"||!tab}
              icon={HiChartPie}
              as="div"
            >
            <Link to="/dashboard?tab=dash">Dashboard</Link>
            </Sidebar.Item>
            )}
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin?("Admin"):"User"}
              labelColor="dark"
              as="div"
            >
            <Link to="/dashboard?tab=profile">Profile</Link>
            </Sidebar.Item>
            {currentUser.isAdmin&&(
               <Sidebar.Item
               active={tab === "posts"}
               icon={HiDocumentText}
               as="div"
             >
            <Link to="/dashboard?tab=posts">Posts</Link>
            </Sidebar.Item>
            )}
            {currentUser.isAdmin&&(
              <Sidebar.Item
              active={tab === "users"}
              icon={HiOutlineUserGroup}
              as="div"
            >
            <Link to="/dashboard?tab=users">Users</Link>
            </Sidebar.Item>
            )}
            {currentUser.isAdmin&&(
              <Sidebar.Item
              active={tab === "comments"}
              icon={HiAnnotation}
              as="div"
            >
            <Link to="/dashboard?tab=comments">Comments</Link>
            </Sidebar.Item>
            )}
            <Sidebar.Item
              active={tab === "savedposts"}
              icon={FaBookmark}
              as="div"
            >
            <Link to="/dashboard?tab=savedposts">SavedPosts</Link>
            </Sidebar.Item>

            <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className="cursor-pointer">
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    );
}
  
