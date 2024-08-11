"use client";
import CommentBar from "@/app/components/CommentBar";
import CommentFeed from "@/app/components/CommentFeed";
import NavBar from "@/app/components/NavBar";
import { BlogPost } from "@/models/BlogPost";
import ShownUser from "@/models/ShownUser";
import Comment from "@/models/Comment";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import updateDate from "@/utils/updateDate";

const page = ({ params }: { params: { postid: string } }) => {
  const [user, setUser] = useState<ShownUser | null>();
  const [post, setPost] = useState<BlogPost>();
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();
  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          } else {
            location.replace("/login");
          }
        })
        .catch((err) => {
          location.replace("/login");
        });
    };

    checkLoggedIn();

    const getPost = async () => {
      await axios
        .get(`/api/posts/byid?id=${params.postid}`, {
          withCredentials: true,
        })
        .then((res: any) => {
          setPost(res.data.post);
          setComments(res.data.comments);
        });
    };

    getPost();
  }, []);

  const handleDeletePost = async () => {
    await axios
      .delete("/api/posts/", {
        data: { id: post?.id },
        withCredentials: true,
      })
      .then(() => {
        location.replace("/home");
      });
  };

  return (
    <main>
      <NavBar user={user}></NavBar>
      <div className="flex p-4">
        <div className="flex flex-col p-4 w-[20%]">
          <ul className="menu bg-base-200 rounded-box">
            <li>
              <button onClick={() => router.back()}>Back</button>
            </li>
            {post?.authorId == user?.id && (
              <li>
                <button onClick={handleDeletePost}>Delete</button>
              </li>
            )}
          </ul>
        </div>
        <div className=" p-4 flex flex-col w-[80%]">
          <div className="text-5xl font-bold text-info mb-10 whitespace-normal">
            {post?.title}
          </div>
          <div className="flex gap-2 items-center justify-between">
            <div className="text-xl">{post?.description}</div>
            <div className="gap-2 flex">
              <span className="badge badge-secondary items-end justify-end hover:underline">
                <Link href={`/user/${post?.authorName}`}>
                  {post?.authorName}
                </Link>
              </span>
              <span className="badge badge-primary items-end justify-end">
                {post?.category}
              </span>

              <span className="badge badge-info items-end justify-end">
                {post?.createdAt
                  ? updateDate(post?.createdAt)[0]
                  : post?.createdAt}
              </span>
              <span className="badge badge-info items-end justify-end">
                {post?.createdAt
                  ? updateDate(post?.createdAt)[1]
                  : post?.createdAt}
              </span>
            </div>
          </div>
          <div className="divider divider-secondary"></div>
          <div>
            <div className="text-md">{post?.content}</div>
          </div>
          <div className="py-10">
            <CommentBar post={post}></CommentBar>
          </div>
          <CommentFeed
            comments={comments}
            author={post?.authorId}
          ></CommentFeed>
        </div>
      </div>
    </main>
  );
};

export default page;
