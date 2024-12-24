import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SearchResults from "./SearchResults";

vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual as any,
    useSearchParams: () => new URLSearchParams("search=therapist"),
  };
});

const renderSearchResults = () => render(
  <table>
    <tbody>
      <SearchResults />
    </tbody>
  </table>
);

describe("SearchResults", () => {
  it("renders the data from the search query", async () => {
    //@ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ data: [
      {
        firstName: "John",
        lastName: "Doe",
        city: "New York",
        degree: "PhD",
        specialties: ["therapist"],
        yearsOfExperience: "10",
        phoneNumber: "123-456-7890",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        city: "Los Angeles",
        degree: "MD",
        specialties: ["therapist"],
        yearsOfExperience: "5",
        phoneNumber: "123-456-7890",
      }
    ] }));
  
    renderSearchResults();
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeVisible();
    });
    expect(screen.queryByText("Jane Smith")).toBeInTheDocument();
  });
});
