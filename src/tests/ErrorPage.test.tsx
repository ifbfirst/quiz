import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorPage from '../pages/ErrorPage';
import * as ReactRouterDOM from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactRouterDOM;

  return {
    ...actual,
    useRouteError: vi.fn(),
    MemoryRouter: actual.MemoryRouter,
  };
});

describe('ErrorPage', () => {
  test('renders error message and back link', () => {
    (ReactRouterDOM.useRouteError as vi.Mock).mockReturnValue(new Error('Mock error'));

    render(
      <ReactRouterDOM.MemoryRouter>
        <ErrorPage />
      </ReactRouterDOM.MemoryRouter>,
    );

    expect(screen.getByText(/Oops!...Sorry, an unexpected error has occurred/i)).toBeInTheDocument();

    const backLink = screen.getByRole('link', { name: /Back to settings/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
