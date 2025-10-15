import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import FeaturedBooks from "../components/featured-books/featured-books";
import Footer from "../components/footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedBooks />
      </main>
      <Footer />
    </>
  );
}
