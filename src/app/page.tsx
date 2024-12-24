import SearchTerm from "./SearchTerm";
import AdvocateTable from "./AdvocateTable";
import Header from "./Header";

export default function Home() {
  return (
    <main className="m-6">
      <Header />
      <SearchTerm />
      <AdvocateTable />
    </main>
  );
}
