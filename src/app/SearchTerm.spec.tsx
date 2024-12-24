import { describe, beforeEach, afterEach, it, expect, vi, Mock } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchTerm from './SearchTerm';

// Mock the next/navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));
const pushMock: ReturnType<typeof vi.fn> = vi.fn();

describe('SearchTerm Component', () => {
  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: pushMock,
    });
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams('search=initialValue'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders input with initial search value', () => {
    render(<SearchTerm />);
    const inputValue = screen.getByRole('textbox', { name: /search for advocates/i }).getAttribute('value');
    expect(inputValue).toBe('initialValue');
  });

  it('updates the URL when typing in the input', async () => {
    const user = userEvent.setup();
    render(<SearchTerm />);
    const input = screen.getByRole('textbox', { name: /search for advocates/i });

    await user.clear(input);
    await user.type(input, 'hello');

    expect(pushMock).toHaveBeenCalledWith('?search=hello');
  });

  it('removes the search parameter from the URL when input is cleared', async () => {
    const user = userEvent.setup();
    render(<SearchTerm />);
    const input = screen.getByRole('textbox', { name: /search for advocates/i });

    await user.clear(input);

    expect(pushMock).toHaveBeenCalledWith('?');
  });
  it("clicking the 'Reset Search' button clears the input and the URL", async () => {
    const user = userEvent.setup();
    render(<SearchTerm />);
    const input = screen.getByRole('textbox', { name: /search for advocates/i });
    const resetButton = screen.getByRole('button', { name: /reset search/i });

    await user.clear(input);
    await user.type(input, 'hello');
    await user.click(resetButton);

    expect(pushMock).toHaveBeenCalledWith('?');
    expect(input.getAttribute("value")).toBe('');
  });
});
