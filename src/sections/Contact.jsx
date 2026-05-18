import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import SectionLabel from "../components/SectionLabel";
import ArrowIcon from "../components/ArrowIcon";

const links = [
  {
    label: "Email",
    value: "radithyardin30@gmail.com",
    href: "mailto:radithyardin30@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/radithyardin",
    href: "https://github.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/radithyardin",
    href: "https://linkedin.com",
  },
  { label: "Twitter", value: "@radithyardin", href: "https://twitter.com" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const copyEmail = () => {
    navigator.clipboard.writeText("radithyardin30@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionWrapper id="contact" alt>
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel
          number="06"
          title={<span style={{ fontFamily: "vt323" }}>Contact</span>}
        />

        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-serif italic text-cream/75 text-[1.3rem] leading-relaxed mb-6"
            >
              "Let's build something intelligent together."
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-light text-cream/55 text-[0.93rem] leading-[1.85] mb-8"
            >
              Whether it's a new AI product, a technical collaboration, or just
              a conversation about the future of intelligent interfaces — my
              inbox is open.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={copyEmail}
              className="group cursor-none glass rounded-full px-7 py-3.5 font-sans text-[0.82rem] text-cream/80 hover:text-cream transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-3"
            >
              <span>{copied ? "✓ Copied!" : "radithyardin30@gmail.com"}</span>
              {!copied && (
                <span className="text-[0.68rem] text-cream/35 group-hover:text-cream/55 transition-colors">
                  Click to copy
                </span>
              )}
            </motion.button>
          </div>

          {/* Right — links */}
          <div className="space-y-2">
            {links.map(({ label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group flex items-center justify-between p-4 rounded-xl border border-cream/8 hover:border-cream/18 hover:bg-cream/5 no-underline transition-all duration-200 cursor-none"
              >
                <div>
                  <div className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/30 mb-0.5">
                    {label}
                  </div>
                  <div className="font-sans text-[0.85rem] text-cream/65 group-hover:text-cream/85 transition-colors">
                    {value}
                  </div>
                </div>
                <ArrowIcon className="text-cream/20 group-hover:text-cream/60 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-200" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-8 border-t border-cream/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <span className="font-sans text-[0.7rem] text-cream/28 uppercase tracking-widest">
            © 2026 Radithya Ardin Sudrajat
          </span>
          <span className="font-sans text-[0.7rem] text-cream/28 uppercase tracking-widest">
            Jakarta, Indonesia · East
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
