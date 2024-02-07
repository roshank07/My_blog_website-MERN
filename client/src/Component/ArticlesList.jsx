import React from "react";
import { Link } from "react-router-dom";

export default function ArticlesList({ post }) {
  // Function to remove HTML tags from a string
  const maxContentHeight = 60; // Adjust this value based on your design

  
  const removeHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  };

  const cleanedContent = removeHtmlTags(post.content);
  const truncatedContent = cleanedContent.length > maxContentHeight
    ? cleanedContent.substring(0, maxContentHeight) + "..."
    : cleanedContent;

  return (
    <div className="flex border-t-2 pt-3 pb-3">
      <div className="pr-4">
        <Link to={`/post/${post.slug}`}>
        <img src={`${post.image}`} className="w-40 h-20 object-cover" alt={post.title} />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="text-xs">
          {new Date(post.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="text-xl font-semibold">{post.title}</div>
        <div className="text-sm overflow-hidden" style={{ maxHeight: `${maxContentHeight}px` }}>
          {truncatedContent}
        </div>
      </div>
    </div>
  );
}
