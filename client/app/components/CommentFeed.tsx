import Comment from "@/models/Comment";
import updateDate from "@/utils/updateDate";
import Link from "next/link";
import React from "react";

interface Props {
  comments: Comment[];
  author?: string;
}

const CommentFeed = ({ comments, author }: Props) => {
  return (
    <div>
      {comments?.map((c) => (
        <div className="flex gap-4 flex-col my-2 py-2" key={c.id}>
          <div className="flex gap-2">
            {author == c.authorId && (
              <span className="badge badge-accent">Author</span>
            )}
            <span className="badge badge-secondary">
              <Link href={`/user/${c.authorName}`}>{c.authorName} </Link>
            </span>
            <span className="badge badge-info">
              {updateDate(c.createdAt)[0]}
            </span>
            <span className="badge badge-info">
              {updateDate(c.createdAt)[1]}
            </span>
          </div>
          <div>{c.content}</div>
          <div className="divider divider-info"></div>
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
