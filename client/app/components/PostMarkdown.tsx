import { insertText } from "@/utils/formatPostContent";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
}

const PostMarkdown = ({ content, setContent, contentRef }: Props) => {
  const markdown_options = [
    { symbol: "**", function: "Bold" },
    { symbol: "*", function: "Italic" },
    { symbol: "__", function: "Underline" },
    { symbol: "~~", function: "Strikethrough" },
    { symbol: "`", function: "Code" },
    { symbol: "||", function: "Spoiler" },
  ];

  return (
    <div className="flex gap-4">
      {markdown_options.map((o) => (
        <button
          key={o.function}
          className={`btn`}
          onClick={() => {
            insertText(o.symbol, content, setContent);
            contentRef.current?.focus();
          }}
        >
          {o.function}
        </button>
      ))}
    </div>
  );
};

export default PostMarkdown;
