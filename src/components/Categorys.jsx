import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaTshirt, FaHome, FaRunning, FaGamepad, FaEllipsisH, FaThLarge } from 'react-icons/fa';
import '../styles/Categorys.css';

const Categorys = () => {
  const categories = [
    { name: 'Todos los productos', icon: <FaThLarge size={24} />, path: '/gallery' },
    { name: 'Electrónica', icon: <FaLaptop size={24} />, path: '/category/electronica' },
    { name: 'Ropa', icon: <FaTshirt size={24} />, path: '/category/ropa' },
    { name: 'Hogar', icon: <FaHome size={24} />, path: '/category/hogar' },
    { name: 'Deportes', icon: <FaRunning size={24} />, path: '/category/deportes' },
    { name: 'Juguetes', icon: <FaGamepad size={24} />, path: '/category/juguetes' },
    { name: 'Otros', icon: <FaEllipsisH size={24} />, path: '/category/otros' },
  ];

  return (
    <nav className="categories-nav">
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <Link to={category.path} className="category-link">
              <div className="category-content">
                {category.icon}
                <span>{category.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categorys;
