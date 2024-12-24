"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type AdvocatesData = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}[];

const SearchResults = () => {
  const params = useSearchParams();
  const searchTerm = params.get("search") || "";
  const [advocates, setAdvocates] = useState<AdvocatesData>([]);

  useEffect(() => {
    fetch(`/api/advocates?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setAdvocates(data.data));
  }, [searchTerm]);

  return (
    advocates.map((advocate) => (
      <tr key={advocate.firstName + advocate.lastName} className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-2 text-sm text-gray-700">{advocate.firstName} {advocate.lastName}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{advocate.city}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{advocate.degree}</td>
        <td className="px-4 py-2 text-sm text-gray-700">
          {advocate.specialties.map((s) => (
            <div key={s} className="bg-gray-100 rounded-full px-2 py-1 inline-block text-xs text-gray-600 mr-1">
              {s}
            </div>
          ))}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700">{advocate.yearsOfExperience}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{advocate.phoneNumber}</td>
      </tr>
    ))
  );
};

export default SearchResults;
