"use client";
import Link from "next/link";
import styles from "./header.module.css";
import Button from "../button/button";

export function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Tasty Tomes
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="#featured" className={styles.navItem}>
            Featured
          </Link>
          <Link href="#genres" className={styles.navItem}>
            Genres
          </Link>
          <Link href="#about" className={styles.navItem}>
            About
          </Link>
        </nav>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}>
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
