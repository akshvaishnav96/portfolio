import React from "react";
import Link from "next/link";
import { memo } from "react";

function NavLinks({ href, text, func = "", scroll = "" }) {

  return (
    <Link
      href={href}
      className={`${
        scroll ? "text-gray-500" : "text-gray-300"
      } hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md transition-colors duration-300`}
      onClick={func}
    >
      {text}
    </Link>
  );
}

export default memo(NavLinks);
