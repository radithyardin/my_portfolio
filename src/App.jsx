import "./index.css";
import { useEffect, useState } from "react";

import Cursor from "./components/Cursor";
import VideoBackground from "./components/VideoBackground";
import NoiseOverlay from "./components/NoiseOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeroParallax from "./components/HeroParallax";
import ScrollProgress from "./components/ScrollProgress";
import LanyardSection from "./components/LanyardSection";

import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Hobbies from "./sections/Hobbies";
import Contact from "./sections/Contact";
import ChatRoom from "./sections/ChatRoom";
import Footer from "./sections/Footer";

const VIDEO_SRC = "/bg-video.mp4";

export default function App() {
  // ✅ FIX 1: Deklarasi state scrollY yang hilang
  const [scrollY, setScrollY] = useState(0);

  // ✅ FIX 2: Scroll ke atas secara agresif — penting untuk Vercel/SSR
  useEffect(() => {
    // Matikan restore posisi scroll bawaan browser
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll langsung
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Backup: ulangi setelah browser selesai paint pertama
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    // Backup ke-2: ulangi lagi setelah sedikit delay (antisipasi hydration)
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  // Scroll listener untuk hero parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Cursor />
      <NoiseOverlay />
      <Navbar />
      <ScrollProgress />

      <main style={{ background: "#0a0908", position: "relative" }}>

        {/* ================= SECTION 1: HERO (STICKY) ================= */}
        <div style={{ height: "200vh", position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              zIndex: 1,
              overflow: "hidden",
              transform: `scale(${1 - scrollY * 0.0001})`,
              filter: `blur(${Math.min(scrollY * 0.01, 10)}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <VideoBackground src={VIDEO_SRC} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 1,
              }}
            />
            <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
              <HeroParallax>
                <Hero />
              </HeroParallax>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: CONTENT (MENIMPA HERO) ================= */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            background: "#0a0908",
            marginTop: "-100vh",
            boxShadow: "0 -50px 100px rgba(0,0,0,0.9)",
            paddingTop: "20px",
          }}
        >
          <LanyardSection />

          <div style={{ background: "#0a0908" }}>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Hobbies />
            <Contact />
            <ChatRoom />
            <Footer />
          </div>
        </div>

      </main>
    </>
  );
}