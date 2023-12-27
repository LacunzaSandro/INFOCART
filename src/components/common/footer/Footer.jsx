
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Carrito</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Contacto</h4>
          <p>Correo: info@mi-tienda.com</p>
          <p>Teléfono: +123 456 789</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Síguenos</h4>
          <ul className={styles.socialIcons}>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2023 Mi Tienda - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
