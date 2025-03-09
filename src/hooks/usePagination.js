import { useState } from 'react';

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Verifica que 'items' sea un arreglo
  if (!Array.isArray(items)) {
    throw new Error("Los items deben ser un arreglo");
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    currentItems,
    paginate,
    currentPage,
    totalPages: Math.ceil(items.length / itemsPerPage),
  };
};

export default usePagination;