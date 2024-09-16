import React from "react";

const PostPageSkeletons = () => {
  return (
    <div className="p-4 flex flex-col gap-6 md:gap-8 w-full lg:w-[80%]">
      <div className="skeleton animate-pulse">
        <div className="h-10"></div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 justify-between">
        <div className="lg:w-[65%] skeleton animate-pulse h-6"></div>
        <div className="gap-2 flex">
          <span className="badge badge-sm lg:badge-md items-end justify-end skeleton animate-pulse"></span>
          <span className="badge badge-sm lg:badge-md items-end justify-end skeleton animate-pulse"></span>
          <span className="badge badge-sm lg:badge-md items-end justify-end skeleton animate-pulse"></span>
          <span className="badge badge-sm lg:badge-md hidden lg:flex items-end justify-end skeleton animate-pulse"></span>
        </div>
      </div>
      <div className="divider p-2 skeleton"></div>
      <div className="skeleton h-64 flex py-4 flex-col gap-4 animate-pulse">
        <div className="flex flex-col gap-4 mx-4">
          <div className="w-7/8 h-3 rounded skeleton animate-pulse bg-slate-800"></div>
          <div className="w-7/8 h-3 rounded skeleton animate-pulse bg-slate-800"></div>
          <div className="w-7/8 h-3 rounded skeleton animate-pulse bg-slate-800"></div>
          <div className="w-7/8 h-3 rounded skeleton animate-pulse bg-slate-800"></div>
          <div className="w-7/8 h-3 rounded skeleton animate-pulse bg-slate-800"></div>
          <div className="w-7/8 h-3 rounded skeleton animate-pulse bg-slate-800"></div>
          <div className="w-7/8 h-3  rounded skeleton animate-pulse bg-slate-800"></div>
          <div className="w-7/8 h-3 rounded skeleton animate-pulse bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default PostPageSkeletons;
