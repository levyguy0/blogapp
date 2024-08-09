import BlogPost from "@/models/BlogPost";
import Link from "next/link";
import React from "react";

interface Props {
  post?: BlogPost;
}

const CommentFeed = ({ post }: Props) => {
  return (
    <div>
      {post?.comments.map((c) => (
        <div className="flex gap-4 flex-col my-2 py-2">
          <div className="flex gap-2">
            <span className="badge badge-secondary">
              <Link href={`/user/${c.authorName}`}>{c.authorName} </Link>
            </span>
            <span className="badge badge-primary">{c.createdAt}</span>
          </div>
          <div>{c.content}</div>
          <div className="divider divider-info"></div>
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
