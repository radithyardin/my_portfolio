import { Suspense, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lanyard from "./Lanyard";

// Helper untuk render per huruf dengan animasi & warna spesifik
function MultiColorText({ text, colors, className, style, delay = 0, inView }) {
  return (
    <div
      className={className}
      style={{ ...style, overflow: "hidden", display: "flex" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{
            duration: 0.85,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          // Mengambil warna dari array berdasarkan index huruf
          className={colors[i % colors.length]}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

export default function LanyardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Palet #1: Cyber-Sunset (Warna Gradasi Langit Sore)
  const sunsetColors = [
    "text-[#FFD700]", // p - Gold
    "text-[#FF8C00]", // o - Orange
    "text-[#FF4500]", // r - Sunset Red
    "text-[#FF1493]", // t - Pink Neon
    "text-[#C71585]", // f - Deep Pink
    "text-[#9400D3]", // o - Violet
    "text-[#8A2BE2]", // l - Blue Violet
    "text-[#4B0082]", // i - Indigo
    "text-[#0000FF]", // o - Deep Blue
  ];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        zIndex: 5,
        background: "#0a0908",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        borderTop: "1px solid rgba(245,242,237,0.05)",
        boxShadow: "0 -40px 120px rgba(0,0,0,0.45)",
      }}
    >
      {/* Background text "WELCOME" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        // Kita gunakan top-0 dan menghilangkan items-center
        className="absolute top-0 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <p
          className="font-bold text-center leading-none"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "clamp(60px, 15vw, 180px)",
            color: "rgba(245,242,237,0.03)",
            WebkitTextStroke: "1px rgba(245,242,237,0.04)",
            letterSpacing: "-0.04em",
            width: "100%",
            // MAGIC TOUCH: Gunakan margin-top negatif untuk benar-benar mentok ke atas
            marginTop: "-0.1em",
            // Atau jika ingin pas di garis border:
            // paddingTop: "20px"
          }}
        >
          WELCOME
        </p>
      </motion.div>

      <div
        className="relative w-full max-w-7xl mx-auto px-8 md:px-16"
        style={{
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="grid md:grid-cols-2 gap-8 w-full items-center">
          <div className="flex flex-col justify-center">
            {/* Label Kecil */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div
                className="h-px w-10"
                style={{ background: "rgba(245,242,237,0.2)" }}
              />
              <span
                className="font-sans text-[0.65rem] uppercase tracking-[0.2em]"
                style={{ color: "rgba(245,242,237,0.35)" }}
              >
                Portfolio 2026
              </span>
            </motion.div>

            {/* MAIN HEADING SEBARIS */}
            <div className="flex items-baseline gap-[0.35em] mb-6 flex-wrap">
              {/* "MY" - Putih Solid */}
              <MultiColorText
                text="MY"
                colors={["text-white"]}
                inView={inView}
                delay={0.4}
                className="leading-tight uppercase"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  fontWeight: 400,
                  fontFamily: "vt323", // Font pixel kamu
                }}
              />

              {/* "PORTFOLIO" - Gradasi Cyber Sunset */}
              <MultiColorText
                text="PORTFOLIO"
                colors={sunsetColors}
                inView={inView}
                delay={0.5}
                className="leading-tight uppercase"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  fontWeight: 400,
                  fontFamily: "vt323",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="font-sans font-light leading-relaxed max-w-sm mb-10 text-[0.92rem]"
              style={{ color: "rgba(245,242,237,0.45)" }}
            >
              Grab the card, swing it around — then scroll down to explore the
              work, skills, and story behind the code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-2"
            >
              {["AI Engineer", "Full-Stack Dev", "Jakarta, ID"].map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-[0.72rem] rounded-full px-4 py-1.5"
                  style={{
                    background: "rgba(245,242,237,0.06)",
                    border: "1px solid rgba(245,242,237,0.12)",
                    color: "rgba(245,242,237,0.55)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Kolom Kanan - Lanyard Interaktif */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[100vh] relative"
          >
            <Suspense fallback={null}>
              <Lanyard position={[0, 0, 10]} gravity={[0, -5, 0]} fov={50} />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
