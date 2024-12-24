import SearchTerm from "./SearchTerm";
import SearchResults from "./SearchResults";

export default function Home() {
  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchTerm />
      <br />
      <br />
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
    </main>
  );
}
