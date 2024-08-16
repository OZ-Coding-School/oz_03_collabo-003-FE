import React from 'react';

interface PaginationProps {
  totalPages: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='mt-4 flex justify-center'>
        {pageNumbers.map((number) => (
          <li key={number} className={`mx-1 ${number === currentPage ? 'font-bold text-blue-accent' : ''}`}>
            <button type='button' onClick={() => paginate(number)} className='rounded px-3 py-1'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
