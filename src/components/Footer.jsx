import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h5>Sobre Tradz</h5>
          <ul>
            <li><Link to="/about">Quiénes somos</Link></li>
            <li><Link to="/careers">Trabaja con nosotros</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h5>Ayuda</h5>
          <ul>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/shipping">Envíos</Link></li>
            <li><Link to="/returns">Devoluciones</Link></li>
            <li><Link to="/support">Soporte</Link></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h5>Legal</h5>
          <ul>
            <li><Link to="/terms">Términos y condiciones</Link></li>
            <li><Link to="/privacy">Política de privacidad</Link></li>
            <li><Link to="/cookies">Política de cookies</Link></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h5>Síguenos</h5>
          <div className='social-links'>
            <a href="#"><FaFacebook className="social-icon" /></a>
            <a href="#"><FaTwitter className="social-icon" /></a>
            <a href="#"><FaInstagram className="social-icon" /></a>
            <a href="#"><FaLinkedin className="social-icon" /></a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© 2024 Tradz. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer