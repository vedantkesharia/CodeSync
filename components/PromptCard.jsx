"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [showFullCode, setShowFullCode] = useState(false);

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);

  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };


  const toggleShowFullCode = () => {
    setShowFullCode(!showFullCode);
  };


  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={18}
            height={18}
          />
        </div>
      </div>

      {/* <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p> */}
      {/* <div className='code_highlight'>
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {post.prompt}
        </SyntaxHighlighter>
      </div> */}
      {/* <div className="code_highlight">
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {showFullCode
            ? post.prompt
            : post.prompt.split("\n").slice(0, 6).join("\n")}
        </SyntaxHighlighter>
        {post.prompt.split("\n").length > 6 && (
          <p
            className="font-inter text-sm text-blue-500 cursor-pointer"
            onClick={toggleShowFullCode}
          >
            {showFullCode ? "...Show Less" : "...Show More"}
          </p>
        )}
      </div> */} 
        <div className="code_highlight">
        <SyntaxHighlighter language="javascript" style={materialDark} customStyle={{ maxHeight: '250px', // Adjust the height as needed
            overflowY: 'auto', // Hide vertical scrollbar
            overflowX: 'auto',}}>
          {post.prompt}
        </SyntaxHighlighter>
        {/* {post.prompt.split("\n").length > 20 && (
          <div
            className={`code_toggle ${
              showFullCode ? "code_open" : "code_closed"
            }`}
            onClick={toggleShowFullCode}
          >
            {showFullCode ? "Collapse" : "Expand"}
          </div>
        )} */}
      </div>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-end gap-4 border-t border-gray-100 pt-3 ">
          <p
            className="font-inter text-sm text-green-600 cursor-pointer "
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-red-800 cursor-pointer "
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
