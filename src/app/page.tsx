import Contact, { Footer } from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
