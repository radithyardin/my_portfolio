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

  // ✅ FIX START POSITION (TARUH DI SINI)
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // scroll untuk hero effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Cursor />
      <NoiseOverlay />
      <Navbar />
      <ScrollProgress />

      {/* Main Container: Jangan beri overflow:hidden di sini kalau mau sticky jalan */}
      <main style={{ background: "#0a0908", position: "relative" }}>
        
        {/* ================= SECTION 1: HERO (DIAM DI TEMPAT) ================= */}
        {/* Container ini tingginya 200vh supaya ada space buat scrolling sebelum ditutup */}
        <div style={{ height: "200vh", position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              zIndex: 1,
              overflow: "hidden",
              // Animasi visual saat scroll
              transform: `scale(${1 - scrollY * 0.0001})`,
              filter: `blur(${Math.min(scrollY * 0.01, 10)}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <VideoBackground src={VIDEO_SRC} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
  <HeroParallax>
    <Hero />
  </HeroParallax>
</div>
          </div>
        </div>

        {/* ================= SECTION 2: CONTENT (MENIMBUN KE ATAS) ================= */}
        {/* Z-index: 10 memastikan konten ini berada DI ATAS Hero saat discroll */}
        <div 
          style={{ 
            position: "relative", 
            zIndex: 10, 
            background: "#0a0908", // Background gelap solid biar nggak tembus
            marginTop: "-100vh",   // Menarik konten tepat ke bawah Hero sticky
            boxShadow: "0 -50px 100px rgba(0,0,0,0.9)", // Efek shadow biar makin kerasa nimbunnya
            paddingTop: "20px" 
          }}
        >
          <LanyardSection />
          
          {/* Konten sisa yang mengalir normal */}
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