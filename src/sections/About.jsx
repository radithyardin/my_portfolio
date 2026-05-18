import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const stats = [
  { value: '3+',  label: 'Years Building' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '3',   label: 'AI Products Live' },
  { value: '∞',   label: 'Lines of Code' },
]

const info = [
  { label: 'Age',       value: '18 Years' },
  { label: 'School', value: 'SMKN 46 JAKARTA' },
  { label: 'Location',  value: 'Jakarta, ID' },
  { label: 'Experience', value: '3+ Years' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-40px' })

  return (
   <SectionWrapper id="about" alt>
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel
          number="01"
          title={<span style={{ fontFamily: "vt323" }}>About</span>}
        />

        {/* Layout: photo card left + content right */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">

          {/* ── LEFT: Profile card (like Javi's card) ── */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: -32, y: 16 }}
            animate={cardInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #1a2235 0%, #0f1520 50%, #1a1535 100%)',
              border: '1px solid rgba(120,140,200,0.18)',
              boxShadow: '0 0 60px rgba(80,100,180,0.12)',
              minHeight: 380,
            }}
          >
            {/* Glow background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(100,120,220,0.18) 0%, transparent 70%)',
              }}
            />

            {/* Photo placeholder */}
            <div className="relative flex justify-center pt-8 pb-2">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  width: 200,
                  height: 220,
                  background: 'linear-gradient(180deg, rgba(100,120,220,0.2) 0%, rgba(60,80,160,0.4) 100%)',
                  border: '1px solid rgba(120,140,220,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="/avatar.png"
                  alt="Ardin"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    filter: 'brightness(0.85) saturate(0.7) hue-rotate(220deg)',
                    mixBlendMode: 'luminosity',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = '<span style="font-size:4rem;opacity:0.3">FK</span>'
                  }}
                />
              </div>
            </div>

            {/* Name + role */}
            <div className="text-center px-6 pb-4">
              <h3
                className="font-serif text-[1.3rem] text-cream font-normal mb-1"
                style={{ textShadow: '0 0 20px rgba(140,160,255,0.4)' }}
              >
                Radithya Ardin
              </h3>
              <p className="font-sans text-[0.75rem] text-cream/50 tracking-wide">AI Engineer</p>
            </div>

            {/* Info table */}
            <div
              className="mx-4 mb-4 rounded-xl p-4"
              style={{ background: 'rgba(245,242,237,0.05)', border: '1px solid rgba(245,242,237,0.08)' }}
            >
              {info.map(({ label, value }) => (
                <div key={label} className="flex justify-between py-1.5 border-b border-cream/5 last:border-0">
                  <span className="font-sans text-[0.72rem] text-cream/35">{label}</span>
                  <span className="font-sans text-[0.72rem] text-cream/65">{value}</span>
                </div>
              ))}
            </div>

            {/* Bottom status bar */}
            <div
              className="mx-4 mb-4 rounded-xl px-4 py-3 flex items-center justify-between"
              style={{
                background: 'rgba(10,9,8,0.6)',
                border: '1px solid rgba(245,242,237,0.08)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ background: 'rgba(100,120,220,0.3)', border: '1px solid rgba(120,140,220,0.3)' }}
                >
                  <span className="text-[0.6rem] font-sans text-cream/60">FK</span>
                </div>
                <div>
                  <div className="font-sans text-[0.72rem] text-cream/70">@radithyardin</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ecf8e]" style={{ animation: 'pulseDot 2.5s ease-in-out infinite' }} />
                    <span className="font-sans text-[0.62rem] text-cream/35">Online</span>
                  </div>
                </div>
              </div>
              <button
                className="font-sans text-[0.68rem] text-cream/80 px-3 py-1.5 rounded-full cursor-none"
                style={{ background: 'rgba(245,242,237,0.12)', border: '1px solid rgba(245,242,237,0.18)' }}
              >
                Hire Me
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT: Description + stats ── */}
          <div>
            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif italic text-cream/80 text-[1.3rem] leading-relaxed mb-6"
            >
              "I build AI products that actually ship."
            </motion.p>

            {/* Body text */}
            <motion.p
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-sans font-light text-cream/58 text-[0.93rem] leading-[1.88] mb-4"
            >
              I'm Ardin — an AI engineer based in Jakarta, Indonesia. I specialise in
              turning complex model pipelines into clean, production-grade interfaces that
              real users can touch.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="font-sans font-light text-cream/58 text-[0.93rem] leading-[1.88] mb-10"
            >
              My work spans the full stack: designing fine-tuning datasets, orchestrating
              agent workflows, and crafting the React frontends that wrap them. I care
              deeply about the gap between "it works in a notebook" and "it works in prod."
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + 0.08 * i, ease: 'easeOut' }}
                  className="rounded-2xl p-5"
                  style={{ background: 'rgba(245,242,237,0.05)', border: '1px solid rgba(245,242,237,0.09)' }}
                >
                  <div className="font-serif text-[2.4rem] text-cream font-normal leading-none mb-1.5">{value}</div>
                  <div className="font-sans text-[0.68rem] text-cream/38 uppercase tracking-widest">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
