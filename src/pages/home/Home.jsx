import React from "react";
import Gallery from "../gallery/Gallery";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";
import useProducts from "../../hooks/useProducts";

function Home() {
  const { products, loading, error } = useProducts();
  const { currentItems, paginate, currentPage, totalPages } = usePagination(products, 10);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar productos: {error.message}</div>;

  return (
    <div>
      <Gallery products={currentItems} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
