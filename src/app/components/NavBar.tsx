'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    // get current path name
    const currentPathName = usePathname();
    console.log(currentPathName);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between text-xl">
      <Link
        href={"/"}
        className=" border-2 p-3 rounded-lg hover:border-red-500 transition-colors"
      >
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {/* Iterating Links  */}
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={`${currentPathName===link.href ? 'text-zinc-800':'text-zinc-400'}  hover:text-zinc-800 transition-colors`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
