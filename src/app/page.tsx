import SearchTerm from "./SearchTerm";
import AdvocateTable from "./AdvocateTable";

export default function Home() {
  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <SearchTerm />
      <AdvocateTable />
    </main>
  );
}
