import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useDispatch,useSelector } from "react-redux";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
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
        dispatch(deleteUserStart());
        const result=await fetch(`/api/user/signout/${currentUser._id}`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data=await result.json();
        if(result.ok){
          dispatch(deleteUserSuccess(data));
        }
        else{
          dispatch(deleteUserFailure(data.message));
        }
        
      } catch (error) {
        dispatch(deleteUserFailure(data.message));
      }
    }
  
    return (
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
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
            <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className="cursor-pointer">
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    );
}
  
