import { Alert, Button, Textarea, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [prevComments, setPrevComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const result = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await result.json();
        if (result.ok) {
          setPrevComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const result = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId: currentUser._id,
          content: comment,
        }),
      });
      const data = await result.json();
      if (result.ok) {
        setComment("");
        setCommentError(null);
        setPrevComments([data, ...prevComments]);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error);
    }
  };
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const result = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (result.ok) {
        const data = await result.json();
        setPrevComments(
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOflikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setPrevComments(
      prevComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const result = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        const data = await result.json();
        setPrevComments(prevComments.filter((c) => c._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center my-5 gap-2 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 rounded-full object-cover"
            src={currentUser.profilePicture}
            alt="profileimg"
          />
          <Link
            className="text-xs text-cyan-500 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-gray-500 my-5 flex gap-1">
          Sign in to comment
          <Link className="text-cyan-500 hover:underline" to={"/signin"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form className="border border-teal-500 rounded-md p-3">
          <Textarea
            placeholder="Add Comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p>{200 - comment.length} characters Remaining</p>
            <Button
              gradientDuoTone="purpleToPink"
              outline
              onClick={handleSubmitComment}
            >
              Comment
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {prevComments.length === 0 ? (
        <p className="text-sm mt-5">No comments</p>
      ) : (
        <>
          <div className="flex items-center mt-5 text-sm gap-1">
            <p>Comments</p>
            <div className="border border-gray-500 py-1 px-2 rounded-sm">
              {prevComments.length}
            </div>
          </div>
          {prevComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
