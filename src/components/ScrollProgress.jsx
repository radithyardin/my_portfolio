import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
  { id: "chat", label: "Chat Room" },
];

export default function ScrollProgress() {
  const [active, setActive] = useState("");
  const [pastHero, setPastHero] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) setPastHero(heroEl.getBoundingClientRect().bottom < 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.45 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {sections.map(({ id, label }) => (
            <div
              key={id}
              className="flex items-center gap-2 group cursor-none"
              onClick={() => scrollTo(id)}
            >
              {/* Label */}
              <AnimatePresence>
                {hovered && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="font-sans text-[0.62rem] uppercase tracking-widest"
                    style={{
                      color:
                        active === id
                          ? "rgba(245,242,237,0.7)"
                          : "rgba(245,242,237,0.28)",
                    }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Dot */}
              <motion.div
                animate={{
                  width: active === id ? 20 : 4,
                  background:
                    active === id
                      ? "rgba(245,242,237,0.7)"
                      : "rgba(245,242,237,0.2)",
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-[3px] rounded-full"
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
