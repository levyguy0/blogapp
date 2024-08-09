"use client";
import CommentBar from "@/app/components/CommentBar";
import NavBar from "@/app/components/NavBar";
import BlogPost from "@/models/BlogPost";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { postid: string } }) => {
  const [user, setUser] = useState<ShownUser | null>();
  const [post, setPost] = useState<BlogPost>();
  const path = usePathname();

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("http://localhost:8080/users/me", { withCredentials: true })
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
        .get(`http://localhost:8080/posts/byid/${params.postid}`, {
          withCredentials: true,
        })
        .then((res: any) => {
          setPost(res.data.post);
        });
    };

    getPost();
  }, []);

  const handleDeletePost = async () => {
    await axios
      .delete("http://localhost:8080/posts/", {
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
              <Link href={localStorage.getItem("lastLink") || "/home"}>
                <button>Back</button>
              </Link>
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
              <span className="badge badge-primary items-end justify-end">
                {post?.category}
              </span>
              <span className="badge badge-secondary items-end justify-end hover:underline">
                <Link
                  onClick={() => localStorage.setItem("lastLink", path)}
                  href={`/user/${post?.authorName}`}
                >
                  {post?.authorName}
                </Link>
              </span>
              <span className="badge badge-info items-end justify-end">
                {post?.createdAt}
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
        </div>
      </div>
      {/* <div className="grid grid-cols-4 grid-rows-8 p-4">
        <div className="col-span-1 row-span-8 p-4">
          <ul className="menu bg-base-200 rounded-box">
            <li>
              <Link href={localStorage.getItem("lastLink") || "/home"}>
                <button>Back</button>
              </Link>
            </li>
            {post?.authorId == user?.id && (
              <li>
                <button onClick={handleDeletePost}>Delete</button>
              </li>
            )}
          </ul>
        </div>
        <div className="col-span-3 row-span-2 p-4 flex flex-col">
          <div className="text-5xl font-bold text-info mb-10 whitespace-normal">
            {post?.title}
          </div>
          <div className="flex gap-2 items-center justify-between">
            <div className="text-xl">{post?.description}</div>
            <div className="gap-2 flex">
              <span className="badge badge-primary items-end justify-end">
                {post?.category}
              </span>
              <span className="badge badge-secondary items-end justify-end hover:underline">
                <Link
                  onClick={() => localStorage.setItem("lastLink", path)}
                  href={`/user/${post?.authorName}`}
                >
                  {post?.authorName}
                </Link>
              </span>
              <span className="badge badge-info items-end justify-end">
                {post?.createdAt}
              </span>
            </div>
          </div>
          <div className="divider divider-secondary"></div>
        </div>
        <div className="col-span-3 row-span-4 px-4">
          <div className="text-md">{post?.content}</div>
        </div>
        <CommentBar post={post}></CommentBar>
      </div> */}
    </main>
  );
};

export default page;
