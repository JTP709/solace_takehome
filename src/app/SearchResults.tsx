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
    fetch(`/api/advocates`)
      .then((response) => response.json())
      .then((response) => (response.data as AdvocatesData).filter((advocate) => {
        return (
          advocate.firstName.includes(searchTerm) ||
          advocate.lastName.includes(searchTerm) ||
          advocate.city.includes(searchTerm) ||
          advocate.degree.includes(searchTerm) ||
          advocate.specialties.includes(searchTerm) ||
          advocate.yearsOfExperience.toString().includes(searchTerm) ||
          advocate.phoneNumber.toString().includes(searchTerm)
        );
      }))
      .then((data) => setAdvocates(data));
  }, [searchTerm]);

  return (
    advocates.map((advocate) => (
      <tr key={advocate.id}>
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
