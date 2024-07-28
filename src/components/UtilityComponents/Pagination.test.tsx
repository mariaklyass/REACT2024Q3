import { it, describe, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Pagination from './Pagination';
import { PaginationProps } from '../../utils/types';

describe('Pagination Component', () => {
  function MockPagination({
    currentPage,
    totalPages,
    setCurrentPage,
  }: PaginationProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        navigate(`?page=${page}`, { replace: true });
      }
    };

    return (
      <>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handlePageChange}
        />
        <div data-testid="location-display">{location.search}</div>
      </>
    );
  }

  it('makes sure the component updates URL query parameter when page changes', async () => {
    const setCurrentPage = vi.fn();
    const initialPage = 1;
    const totalPages = 5;

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route
            path="/"
            element={
              <MockPagination
                currentPage={initialPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Next'));

    expect(setCurrentPage).toHaveBeenCalledWith(2);

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toBe(
        '?page=2'
      );
    });
  });

  it('ensures Previous button is disabled on the first page', () => {
    const setCurrentPage = vi.fn();
    const initialPage = 1;
    const totalPages = 5;

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route
            path="/"
            element={
              <Pagination
                currentPage={initialPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('ensures Next button is disabled on the last page', () => {
    const setCurrentPage = vi.fn();
    const initialPage = 5;
    const totalPages = 5;

    render(
      <MemoryRouter initialEntries={['/?page=5']}>
        <Routes>
          <Route
            path="/"
            element={
              <Pagination
                currentPage={initialPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('ensures page number is correctly displayed', () => {
    const initialPage = 3;
    const totalPages = 5;

    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <Routes>
          <Route
            path="/"
            element={
              <Pagination
                currentPage={initialPage}
                totalPages={totalPages}
                setCurrentPage={vi.fn()}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
  });
});
