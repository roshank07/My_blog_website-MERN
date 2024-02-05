import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticlesList from "../Component/ArticlesList";
const imageUrl = "https://source.unsplash.com/random";
const quoteApiUrl = 'https://api.quotable.io/random';


function Home() {
  const [posts, setPosts] = useState([]);
  const [quote,setQuote]=useState({});
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
  useEffect(() => {
    const fetchquote = async () => {
      try {
        const result = await fetch(`${quoteApiUrl}`);
        const data = await result.json();
        if (result.ok) {
          setQuote(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchquote();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
        <div className="relative">
          <img
            src={imageUrl}
            alt="Welcome Image"
            className="w-full h-80 object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold lg:text-6xl mb-6">
              Welcome to Void Writes
            </h1>
            <p className="text-xs lg:text-sm text-pink-500">"{quote&&quote.content}" --{quote&&quote.author}</p>
          </div>
        </div>
        <p className="text-gray-500 font-semibold ">
            I write about Full Stack Development and Singlestore.
          </p>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-col mx-auto">
              {posts.map((post) => (
                <ArticlesList key={post._id} post={post} />
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
