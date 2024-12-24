import SearchResults from "./SearchResults";

const AdvocateTable = () => {
  return (
    <table>
      <thead>
        <th>First Name</th>
        <th>Last Name</th>
        <th>City</th>
        <th>Degree</th>
        <th>Specialties</th>
        <th>Years of Experience</th>
        <th>Phone Number</th>
      </thead>
      <tbody>
        <SearchResults />
      </tbody>
    </table>
  )
};

export default AdvocateTable;
