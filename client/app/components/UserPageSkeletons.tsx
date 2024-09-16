import React from "react";

const UserPageSkeletons = () => {
  return (
    <div className="p-4">
      <div className="w-full p-4 my-10">
        <div className="flex gap-2 skeleton animate-pulse h-8"></div>
        <div>
          <div className="divider skeleton animate-pulse p-2"></div>
          <div className="skeleton animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-32 flex justify-center flex-col gap-4 animate-pulse">
          <div className="w-[90%] h-4  rounded skeleton bg-slate-800 mx-4"></div>
          <div className="flex flex-col gap-2 mx-4">
            <div className="w-4/5 h-3 rounded skeleton bg-slate-800"></div>
            <div className="w-4/5 h-3  rounded skeleton bg-slate-800"></div>
            <div className="w-3/5 h-3 rounded skeleton bg-slate-800"></div>
          </div>
        </div>
        <div className="skeleton h-32 flex justify-center flex-col gap-4 animate-pulse">
          <div className="w-[90%] h-4  rounded skeleton bg-slate-800 mx-4"></div>
          <div className="flex flex-col gap-2 mx-4">
            <div className="w-4/5 h-3 rounded skeleton bg-slate-800"></div>
            <div className="w-4/5 h-3  rounded skeleton bg-slate-800"></div>
            <div className="w-3/5 h-3 rounded skeleton bg-slate-800"></div>
          </div>
        </div>
        <div className="skeleton h-32 flex justify-center flex-col gap-4 animate-pulse">
          <div className="w-[90%] h-4  rounded skeleton bg-slate-800 mx-4"></div>
          <div className="flex flex-col gap-2 mx-4">
            <div className="w-4/5 h-3 rounded skeleton bg-slate-800"></div>
            <div className="w-4/5 h-3  rounded skeleton bg-slate-800"></div>
            <div className="w-3/5 h-3 rounded skeleton bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageSkeletons;
