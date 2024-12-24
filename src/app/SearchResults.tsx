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
      <tr key={advocate.firstName + advocate.lastName}>
        <td>{advocate.firstName} {advocate.lastName}</td>
        <td>{advocate.city}</td>
        <td>{advocate.degree}</td>
        <td>{advocate.specialties.map((s) => (
          <div key={s}>{s}</div>
        ))}</td>
        <td>{advocate.yearsOfExperience}</td>
        <td>{advocate.phoneNumber}</td>
      </tr>
    ))
  );
};

export default SearchResults;
