import BlogPost from "@/models/BlogPost";
import React from "react";

interface Props {
  post?: BlogPost;
}

const CommentFeed = ({ post }: Props) => {
  return (
    <div>
      {post?.comments.map((c) => (
        <div>
          <div>{c.authorName}</div>
          <div>{c.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
