import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";

export default function DashPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const[showMore,setShowore]=useState(true);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await fetch(
          `/api/post/getposts?userId=${currentUser._id}`
        );
        const data = await result.json();
        if (result.ok) {
          setUserPosts(data.posts);
          if(data.posts.length<9){
            setShowore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      getPost();
    }
  }, [currentUser._id]);
  // console.log('userposts',userPosts);

  const handleShowmore=async()=>{
    const startIndex=userPosts.length;
    try {
      const result = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await result.json();
      if (result.ok) {
        setUserPosts((prev)=>[...prev,...data.posts]);
        if(data.posts.length<9){
          setShowore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <div className="table-auto overflow-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300 
     dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-20 w-40 object-cover bg-gray-500"
                        />
                      </Link>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    }
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/updatepost/${post._id}`}
                      className="text-teal-500 hover:underline"
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore&&(
            <button className="w-full text-teal-500 self-center text-sm py-7" onClick={handleShowmore}>Show More</button>
          )}
        </>
      ) : (
        <p>You have No post</p>
      )}
    </div>
  );
}
