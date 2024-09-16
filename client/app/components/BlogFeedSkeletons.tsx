import React from "react";

const BlogFeedSkeletons = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex flex-col gap-4">
      {skeletons.map((s) => (
        <div
          className="skeleton h-32 flex justify-center flex-col gap-4 animate-pulse"
          key={s}
        >
          <div className="w-[90%] h-4  rounded skeleton bg-slate-800 mx-4"></div>
          <div className="flex flex-col gap-2 mx-4">
            <div className="w-4/5 h-3 rounded skeleton bg-slate-800"></div>
            <div className="w-4/5 h-3  rounded skeleton bg-slate-800"></div>
            <div className="w-3/5 h-3 rounded skeleton bg-slate-800"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogFeedSkeletons;
