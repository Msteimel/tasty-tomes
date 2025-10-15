import styles from "./featured-books.module.css";

type Book = { id: string; title: string; author: string; genre: string };

const BOOKS: Book[] = [
  {
    id: "1",
    title: "The Flavor of Ink",
    author: "Ava North",
    genre: "Fantasy",
  },
  {
    id: "2",
    title: "Midnight Recipes",
    author: "J. Caldwell",
    genre: "Mystery",
  },
  {
    id: "3",
    title: "Library of Echoes",
    author: "Leah Finch",
    genre: "Sci-Fi",
  },
  { id: "4", title: "Binding Light", author: "Corin Dale", genre: "Romance" },
  {
    id: "5",
    title: "Mechanical Pages",
    author: "E. Ramos",
    genre: "Steampunk",
  },
  { id: "6", title: "Harvest of Words", author: "Mira Sol", genre: "Drama" },
];

export function FeaturedBooks() {
  return (
    <section
      id="featured"
      className={styles.section}
      aria-labelledby="featured-heading">
      <div className={styles.inner}>
        <h2 id="featured-heading" className={styles.heading}>
          Featured Books
        </h2>
        <div className={styles.grid}>
          {BOOKS.map((b) => (
            <article key={b.id} className={styles.card} aria-label={b.title}>
              <h3 className={styles.title}>{b.title}</h3>
              <p className={styles.author}>{b.author}</p>
              <p className={styles.meta}>{b.genre}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBooks;
