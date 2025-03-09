import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Form className="d-flex w-100" onSubmit={handleSearch}>
      <Form.Control
        type="search"
        placeholder="Buscar productos en Tradz..."
        className="me-2 search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Buscar"
      />
      <Button 
        variant="primary" 
        className="me-2 search-button"
        type="submit"
      >
        Buscar
      </Button>
    </Form>
  );
};

export default Search;
