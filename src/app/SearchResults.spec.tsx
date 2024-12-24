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

describe("SearchResults", () => {
  it("fetches the search query from the URL and filters the advocates", async () => {
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
        specialties: ["psychiatrist"],
        yearsOfExperience: "5",
        phoneNumber: "123-456-7890",
      }
    ] }));
  
    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeVisible();
    })
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });
});
