import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import GitHubShowcase from "./components/GitHubShowcase";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <GitHubShowcase />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
