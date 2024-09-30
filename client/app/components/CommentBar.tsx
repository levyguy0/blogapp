"use client";

import { BlogPost } from "@/models/BlogPost";
import Comment from "@/models/Comment";
import axios from "axios";
import React, { useRef, useState } from "react";

interface Props {
  post?: BlogPost;
  setPage: (num: number) => void;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

const CommentBar = ({ post, setPage, comments, setComments }: Props) => {
  const [errorTextarea, setErrorTextarea] = useState("");
  const [success, setSuccess] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const sendComment = async () => {
    let content = commentContent;
    if (!content || content.length > 500) {
      setErrorTextarea("Comment must be between 0 and 500 characters long");
      setSuccess("");
      return;
    }
    setErrorTextarea("");

    const res = await axios
      .post(
        "/api/posts/comment",
        { content: content, blogID: post?.id },
        { withCredentials: true }
      )
      .then((res) => {
        setSuccess(res.data["success"]);
        setPage(1);
        if (comments) {
          setComments([res.data.comment, ...comments]);
          setCommentContent("");
        } else {
          setComments([res.data.comment]);
          setCommentContent("");
        }
      });
  };

  return (
    <div className="comment_bar row-span-2 col-span-3 relative">
      <div className="flex flex-col gap-4">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className={`textarea-sm textarea textarea-bordered flex-grow ${
            errorTextarea && "textarea-error"
          } ${success && "textarea-success"}`}
          placeholder="Leave a comment"
        ></textarea>
        <button
          className="btn btn-square flex-grow w-full btn-primary"
          onClick={sendComment}
        >
          Post
        </button>
        {errorTextarea && (
          <div className="text-error text-sm">{errorTextarea}</div>
        )}
        {success && <div className="text-success text-sm">{success}</div>}
      </div>
    </div>
  );
};

export default CommentBar;
