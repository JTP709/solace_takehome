import { describe, it, vi, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SearchTerm from "./SearchTerm";

const useRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => useRouter,
}));

describe("Search Term", () => {
  it("search input should change url when user types", async () => {
    const user = userEvent.setup();
    render(<SearchTerm />);

    await user.type(screen.getByLabelText("search for advocates"), "hello");

    expect(useRouter.push).toHaveBeenCalledWith({ query: { search: "hello" } });
  });
});
