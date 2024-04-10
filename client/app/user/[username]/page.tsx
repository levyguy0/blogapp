import React from "react";

const page = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <div>page {params.username}</div>
    </div>
  );
};

export default page;
