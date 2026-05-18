import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Email", href: "mailto:radithyardin30@gmail.com" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Big text parallax — moves up slower than scroll
  const bigTextY = useTransform(scrollYProgress, [0, 1], ["40px", "-10px"]);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "#080706",
        borderTop: "1px solid rgba(245,242,237,0.06)",
      }}
    >
      {/* Top content */}
      <div className="max-w-6xl mx-auto px-8 md:px-20 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-[0.7rem] uppercase tracking-[0.2em] text-cream/28 mb-4">
              Let's connect
            </p>
            <h2
              className="font-serif text-cream font-normal leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Ready to build something <em className="italic">great?</em>
            </h2>
            <a
              href="mailto:radithyardin30@gmail.com"
              className="inline-flex items-center gap-3 font-sans text-[0.8rem] text-cream/70 hover:text-cream transition-colors duration-200 no-underline group"
            >
              <span
                className="w-8 h-px"
                style={{ background: "rgba(245,242,237,0.3)" }}
              />
              radithyardin30@gmail.com
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </a>
          </motion.div>

          {/* Right — socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-3 md:items-end"
          >
            {socials.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + 0.07 * i }}
                className="group font-sans text-[0.95rem] text-cream/35 hover:text-cream/80 no-underline transition-all duration-200 flex items-center gap-2"
              >
                <span className="w-0 group-hover:w-4 h-px bg-cream/40 transition-all duration-200 overflow-hidden" />
                {label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-px origin-left mb-8"
          style={{ background: "rgba(245,242,237,0.07)" }}
        />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
        >
          <span className="font-sans text-[0.65rem] text-cream/22 uppercase tracking-widest">
            © 2026 Radithya Ardin Sudrajat · Jakarta, Indonesia
          </span>
          <span className="font-sans text-[0.65rem] text-cream/22 uppercase tracking-widest">
            Built with React · Vite · Tailwind · Framer Motion
          </span>
        </motion.div>
      </div>

      {/* ── BIG "PORTFOLIO" TEXT ── */}
      <div className="relative mt-auto overflow-hidden">
        <motion.div style={{ y: bigTextY }} className="flex justify-center">
          <p
            className="font-bold text-center select-none leading-[0.8] w-full"
            style={{
              // Menggunakan Inter (pastikan sudah di-import di layout/CSS kamu)
              fontFamily: '"Inter", sans-serif',
              // Ukuran dinamis agar pas di layar
              fontSize: "clamp(60px, 16vw, 240px)",
              color: "rgba(245,242,237,0.03)",
              // Garis tepi yang samar tapi elegan
              WebkitTextStroke: "1px rgba(245,242,237,0.12)",
              // Rapatkan sedikit jarak antar huruf agar tidak terpotong di kanan
              letterSpacing: "-0.05em",
              // Menghilangkan whitespace bawah agar benar-benar mentok
              marginBottom: "-0.05em",
              // Tambahkan sedikit padding kiri-kanan agar huruf 'P' dan 'O' aman
              padding: "0 20px",
            }}
          >
            PORTFOLIO
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
