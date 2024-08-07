// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import NavLinks from "@/components/navbar/NavLinks";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/Navbar.module.css";
const navLinks = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/contact", text: "Contact" },
  { href: "/portfolio", text: "Portfolio" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []); // Empty dependency array to ensure this function is not recreated

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    if (scrollPosition >= 140) {
      setNavScrolled(true);
    } else if (scrollPosition < 120) {
      setNavScrolled(false);
    } else {
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  let navScrl = useMemo(() => navScrolled, [navScrolled]);

  return (
    <nav
      className={`${
        navScrolled
          ? "bg-white shadow-md sticky top-0 w-full transition-colors duration-300 ease-out opacity-90 shadow-gray-200"
          : "bg-gradient-to-l from-stone-500 to-stone-700 relative transition-colors duration-300 ease-in-out"
      } text-white`}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className={`text-2xl font-boldc ${styles.invert}`}>
          <Image
            src="/White_And_Black_Modern_Abstract_Beauty_Logo-removebg-preview.png"
            width={125}
            height={125}
            alt="web logo"
          />
        </Link>
        <button
          className="md:hidden px-3 py-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className={`h-6 w-6 transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-50 bg-gradient-to-r from-stone-300 to-stone-500 md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative flex flex-col items-center bg-gradient-to-r from-stone-300 to-stone-500 bg-opacity-80">
            <Link href="/" className="text-2xl font-bold mb-4 mt-4">
              <Image
                src="/White_And_Black_Modern_Abstract_Beauty_Logo-removebg-preview.png"
                width={200}
                height={200}
                alt="web logo"
              />
            </Link>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={closeMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center space-y-4 mt-4 overflow-auto">
              {navLinks.map(({ href, text }, i) => (
                <NavLinks text={text} href={href} func={closeMenu} key={i} />
              ))}
            </div>
          </div>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {navLinks.map(({ href, text }, i) => (
            <NavLinks text={text} href={href} scroll={navScrl} key={i} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
