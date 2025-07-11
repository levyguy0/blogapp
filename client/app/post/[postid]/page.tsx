"use client";
import CommentBar from "@/app/components/CommentBar";
import CommentFeed from "@/app/components/CommentFeed";
import NavBar from "@/app/components/NavBar";
import { BlogPost } from "@/models/BlogPost";
import ShownUser from "@/models/ShownUser";
import Comment from "@/models/Comment";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import updateDate from "@/utils/updateDate";
import CommentPagination from "@/app/components/CommentPagination";
import PostPageSkeletons from "@/app/components/PostPageSkeletons";
import { formatPostContent } from "@/utils/formatPostContent";

const PostPage = ({ params }: { params: { postid: string } }) => {
  const [user, setUser] = useState<ShownUser | null>();
  const [post, setPost] = useState<BlogPost>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [none, setNone] = useState(false);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          } else {
            router.replace("/login");
          }
        })
        .catch((err) => {
          router.replace("/login");
        });
    };

    checkLoggedIn();

    const getPost = async () => {
      await axios
        .get(`/api/posts/byid?id=${params.postid}&page=${page}`, {
          withCredentials: true,
        })
        .then((res: any) => {
          res.data.post.content = formatPostContent(res.data.post.content);
          setPost(res.data.post);
          setComments(res.data.comments);
          setNumberOfPages(res.data.numberOfPages);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setNone(true);
            setLoading(false);
          }
        });
    };

    getPost();
  }, [page]);

  const handleDeletePost = async () => {
    await axios
      .delete("/api/posts/", {
        data: { id: post?.id },
        withCredentials: true,
      })
      .then(() => {
        router.replace("/home");
      });
  };

  return (
    <main>
      <NavBar optionalUser={user}></NavBar>
      <div className="flex flex-col lg:flex-row p-4">
        <div className="flex-row lg:flex-col p-2 w-full lg:w-[20%] flex">
          <ul className="menu bg-base-200 w-full rounded-box">
            <li>
              <button onClick={() => router.back()}>Back</button>
            </li>
            {!loading && post?.authorId == user?.id && !none && (
              <li>
                <button onClick={handleDeletePost}>Delete</button>
              </li>
            )}
          </ul>
        </div>
        {loading ? (
          <PostPageSkeletons />
        ) : !none ? (
          <div className=" p-4 flex flex-col w-full lg:w-[80%]">
            <div>
              <div className="text-3xl lg:mt-0 lg:text-5xl font-bold text-info mb-2 lg:mb-5 break-words">
                {post?.title}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 justify-between">
              <div className="text-md lg:text-xl mb-2 lg:w-[65%] break-words ">
                {post?.description}
              </div>
              <div className="gap-2 flex">
                <span className="badge badge-sm lg:badge-md badge-secondary hover:underline">
                  <Link href={`/user/${post?.authorName}`}>
                    {post?.authorName}
                  </Link>
                </span>
                <span className="badge badge-sm lg:badge-md badge-primary">
                  {post?.category}
                </span>

                <span className="badge badge-sm lg:badge-md badge-info">
                  {post?.createdAt
                    ? updateDate(post?.createdAt)[0]
                    : post?.createdAt}
                </span>
                <span className="badge badge-sm lg:badge-md badge-info hidden lg:flex">
                  {post?.createdAt
                    ? updateDate(post?.createdAt)[1]
                    : post?.createdAt}
                </span>
              </div>
            </div>
            <div className="divider divider-secondary"></div>
            <div className="">
              {post?.content && (
                <div
                  className="text-md break-words"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                ></div>
              )}
            </div>
            <div className="py-10">
              <CommentBar
                post={post}
                comments={comments}
                setComments={setComments}
                setPage={setPage}
              ></CommentBar>
            </div>
            <CommentFeed
              comments={comments}
              author={post?.authorId}
            ></CommentFeed>
            <CommentPagination
              page={page}
              setPage={setPage}
              numberOfPages={numberOfPages}
            ></CommentPagination>
          </div>
        ) : (
          <div className="w-full justify-center items-center flex my-5">
            <span className="badge badge-lg badge-error">No post found</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default PostPage;
