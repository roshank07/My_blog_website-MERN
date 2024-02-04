import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import CallToAction from "../Component/CallToAction";
import CommentSection from "../Component/CommentSection";
import PostCard from "../Component/PostCard";
import { useSelector } from "react-redux";
import { FaHeart, FaBookmark, FaShareSquare } from "react-icons/fa";
import moment from "moment";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        setLoading(true);
        const result = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await result.json();
        if (result.ok) {
          setError(false);
          setLoading(false);
          setPost(data.posts[0]);
        } else {
          setError(data.message);
          setLoading(true);
        }
      };
      fetchPost();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    try {
      const fecthRecentPost = async () => {
        const result = await fetch(`/api/post/getposts?limit=3}`);
        const data = await result.json();
        if (result.ok) {
          setRecentPost(data.posts);
        }
      };
      fecthRecentPost();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-xl" />
      </div>
    );

  const onPostLike = async (postId) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    try {
      const result = await fetch(`/api/post/likepost/${postId}`, {
        method: "PUT",
      });

      if (result.ok) {
        const data = await result.json();
        if (post._id === postId) {
          setPost({
            ...post,
            likes: data.likes,
            numberOflikes: data.numberOflikes,
          });
        }
      } else {
        console.log("Error occured from server.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPostSave = async (postId) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    try {
      const result = await fetch(`/api/post/savepost/${postId}`, {
        method: "PUT",
      });

      if (result.ok) {
        const data = await result.json();
        if (post._id === postId) {
          setPost({
            ...post,
            saves: data.saves,
            numberOfsaves: data.numberOfsaves,
          });
        }
      } else {
        console.log("Error occured from server.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          url: `/post/${post.slug}`,
        });
      } else {
        // Fallback for browsers that do not support Web Share API
        console.log("Web Share API not supported.");
        // Implement your custom share logic here (e.g., open a modal with share options)
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-4"
      >
        <Button color="gray" size="xs" pill>
          {post && post.category}
        </Button>
      </Link>
      <div className="flex justify-end p-3 mx-auto w-full max-w-2xl text-xs">
        <span className="pr-3">{post && moment(post.createdAt).fromNow()}</span>
        <span className="italic">
          {post && (post.content.length / 1000 + 1).toFixed(0)} mins read
        </span>
      </div>
      <div className="flex justify-between mx-auto w-full max-w-2xl text-xs border-t-2 border-b-2 border-gray-100">
        <div className="p-3 max-w-2xl mx-auto w-full flex flex-start">
          <span className="pr-2">
            <button
              className={`text-gray-500 hover:text-red-400 ${
                currentUser &&
                post.likes.includes(currentUser._id) &&
                "!text-red-400"
              }`}
              type="button"
              onClick={() => onPostLike(post._id)}
            >
              <FaHeart size={20} className="text-sm" />
            </button>
          </span>
          <span className="pr-2">
            <p className="text-gray-400">
              {post.numberOflikes > 0 && post.numberOflikes}
            </p>
          </span>
          <span className="pr-2">
            <button
              className={`text-gray-500 hover:text-blue-400 ${
                currentUser &&
                post.saves.includes(currentUser._id) &&
                "!text-blue-400"
              }`}
              type="button"
              onClick={() => onPostSave(post._id)}
            >
              <FaBookmark size={20} className="text-sm" />
            </button>
          </span>
          <span>
            <p className="text-gray-400">
              {post.numberOfsaves > 0 && post.numberOfsaves}
            </p>
          </span>
        </div>
        <div className="p-3 max-w-2xl flex flex-start">
          <span className="pl-3">
            <button
              className="text-gray-500 hover:text-blue-400"
              type="button"
              onClick={handleShare}
            >
              <FaShareSquare size={20} className="text-sm" />
            </button>
          </span>
        </div>
      </div>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-1 p-3 max-w-2xl mx-auto w-full object-cover"
      />
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      {/* <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div> */}
      <div>
        <CommentSection postId={post._id} />
      </div>
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPost &&
            recentPost.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
