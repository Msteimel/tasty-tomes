"use client";
import styles from "./hero.module.css";
import Button from "../button/button";

export function Hero() {
  return (
    <section className={styles.root} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <h1 id="hero-heading" className={styles.title}>
          Discover Your Next Favorite Book
        </h1>
        <p className={styles.tagline}>
          Curated collections, personalized recommendations, and a world of
          stories at your fingertips.
        </p>
        <div className={styles.actions}>
          <Button size="lg">Browse Library</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
