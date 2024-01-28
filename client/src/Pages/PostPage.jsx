import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner,Button } from "flowbite-react";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post&&post.title}</h1>
      <Link to={`/search/category?=${post&&post.category}`} className="self-center mt-4">
      <Button color='gray' size='xs' pill >{post&&post.category}</Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
}
