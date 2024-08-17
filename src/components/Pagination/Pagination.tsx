'use client';

import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  total: number;
  search?: string;
  details?: string;
}

function Pagination({
  currentPage,
  total,
  search = '',
  details = '',
}: PaginationProps): JSX.Element {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const query = {
      page: String(page),
      ...(search && { search }),
      ...(details && { details }),
    };
    router.push(`/?${new URLSearchParams(query).toString()}`);
  };

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span>
        Page {currentPage} out of {total}
      </span>

      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === total}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
