"use client";

import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-800">
              Solace Advocates
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">
              Home
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-800 font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-800 font-medium">
              Contact
            </a>
          </nav>
          <button
            type="button"
            className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <a href="#" className="block text-gray-600 hover:text-gray-800 font-medium">
              Home
            </a>
            <a href="#about" className="block text-gray-600 hover:text-gray-800 font-medium">
              About
            </a>
            <a href="#contact" className="block text-gray-600 hover:text-gray-800 font-medium">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
