"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchTerm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('search') || '');

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
    const newParams = new URLSearchParams(searchParams?.toString() || "");
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    router.push(`?${newParams.toString()}`);
  };

  const handleReset = () => {
    setSearchValue('');
    const newParams = new URLSearchParams(searchParams?.toString() || "");
    newParams.delete('search');
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 my-6">
      <input
        className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
        aria-label="search for advocates"
        onChange={handleInputChange}
        value={searchValue}
        placeholder="Search for advocates"
      />
      <button
        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-all"
        onClick={handleReset}
      >
        Reset Search
      </button>
    </div>
  )
};

export default SearchTerm;
