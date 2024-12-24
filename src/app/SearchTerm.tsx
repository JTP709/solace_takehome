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
    <div>
      <h2>Search</h2>
      <input aria-label="search for advocates" onChange={handleInputChange} value={searchValue} />
      <button onClick={handleReset}>Reset Search</button>
    </div>
  )
};

export default SearchTerm;
