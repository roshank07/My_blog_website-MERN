import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../Component/CallToAction";
import PostCard from "../Component/PostCard";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await fetch("/api/post/getposts");
        const data = await result.json();
        if (result.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to My Blog
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          I write about Singlestore and Full Stack Development.
        </p>
        <Link
          to={"/search"}
          className="text-teal-500 font-semibold text-xs sm:text-sm hover:underline"
        >
          See All Posts
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-teal-500 font-semibold text-xs sm:text-sm hover:underline text-center"
            >
              See All Posts
            </Link>
          </div>
        )}
      </div>
      {/* <div className=" bg-blue-200 dark:bg-slate-700">
        <CallToAction />
      </div> */}
    </div>
  );
}

export default Home;
