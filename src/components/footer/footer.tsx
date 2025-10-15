import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div>&copy; {new Date().getFullYear()} Tasty Tomes</div>
        <nav className={styles.links} aria-label="Footer navigation">
          <a href="#about" className={styles.link}>
            About
          </a>
          <a href="#contact" className={styles.link}>
            Contact
          </a>
          <a href="#privacy" className={styles.link}>
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
