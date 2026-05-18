import { motion } from 'framer-motion'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiSupabase, SiTailwindcss } from 'react-icons/si'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
})

// Logo terbaru Vite & Firebase pakai SVG dari CDN Simple Icons
const ViteLogo = () => (
  <img
    src="https://cdn.simpleicons.org/vite/BD34FE"
    width={15}
    height={15}
    alt="Vite"
    style={{ display: 'block' }}
  />
)

const FirebaseLogo = () => (
  <img
    src="https://cdn.simpleicons.org/firebase/FFCA28"
    width={15}
    height={15}
    alt="Firebase"
    style={{ display: 'block' }}
  />
)

// Ganti bagian array badges dengan koordinat baru ini:
const badges = [
  // Bagian Kiri (ditambah menjadi min 12-15% agar ada ruang dari pinggir)
  { label: 'React',    icon: <FaReact color="#61DAFB" size={15}/>,      x: '15%',  y: '22%', delay: 1.2 },
  { label: 'Node.js',  icon: <FaNodeJs color="#83CD29" size={15}/>,     x: '12%',  y: '44%', delay: 1.3 },
  { label: 'Supabase', icon: <SiSupabase color="#3ECF8E" size={15}/>,    x: '14%',  y: '68%', delay: 1.6 },
  
  // Bagian Kanan (dikurangi sedikit agar tidak mepet kanan)
  { label: 'Vite',     icon: <ViteLogo />,                               x: '75%', y: '18%', delay: 1.4 },
  { label: 'Firebase', icon: <FirebaseLogo />,                           x: '78%', y: '44%', delay: 1.7 },
  { label: 'Tailwind', icon: <SiTailwindcss color="#38BDF8" size={15}/>, x: '73%', y: '70%', delay: 1.5 },
]

const floatStyles = [
  { animation: 'floatA 3.8s ease-in-out 0.2s infinite' },
  { animation: 'floatB 4.1s ease-in-out 0.5s infinite' },
  { animation: 'floatC 3.5s ease-in-out 0.0s infinite' },
  { animation: 'floatA 4.3s ease-in-out 0.8s infinite' },
  { animation: 'floatB 3.9s ease-in-out 0.3s infinite' },
  { animation: 'floatC 4.2s ease-in-out 0.6s infinite' },
]

export default function Hero() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
        overflow: 'hidden',
      }}
    >
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: b.delay }}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 14px 6px 10px',
            borderRadius: 100,
            background: 'rgba(245,242,237,0.07)',
            border: '1px solid rgba(245,242,237,0.14)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(245,242,237,0.7)',
            fontSize: 11,
            fontFamily: 'DM Sans, sans-serif',
            ...floatStyles[i],
          }}
          className="hidden md:flex"
        >
          {b.icon}
          {b.label}
        </motion.div>
      ))}

      <motion.div {...fadeUp(0.35)}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 20px', borderRadius: 100, marginBottom: 32,
          background: 'rgba(245,242,237,0.08)', border: '1px solid rgba(245,242,237,0.16)',
          backdropFilter: 'blur(12px)',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7ecf8e', animation: 'pulseDot 2.5s ease-in-out infinite' }} />
          <span style={{ fontSize: 12, fontFamily: 'DM Sans, sans-serif', color: 'rgba(245,242,237,0.8)', letterSpacing: '0.04em' }}>
            Building AI systems with product-level clarity.
          </span>
        </div>
      </motion.div>

      <motion.h1
        {...fadeUp(0.5)}
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 'clamp(3rem, 7.5vw, 6rem)',
          fontWeight: 400,
          color: '#f5f2ed',
          lineHeight: 1.06,
          letterSpacing: '-0.025em',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        
        <span style={{ fontFamily: 'VT323', position: 'relative' }}>
          Hi! I am Ardin
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', bottom: 2, left: 0, right: 0,
              height: 2, background: 'rgba(245,242,237,0.28)', transformOrigin: 'left',
              display: 'block',
            }}
          />
        </span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.65)}
        style={{
          fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
          color: 'rgba(245,242,237,0.62)', lineHeight: 1.8,
          maxWidth: 520, marginBottom: 48,
        }}
      >
        An AI engineer with full-stack delivery experience, building intelligent
        products from model design to production-ready interfaces.
      </motion.p>

      <motion.button
        {...fadeUp(0.82)}
        onClick={scrollToNext}
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '12px 28px', borderRadius: 100,
          background: 'rgba(245,242,237,0.08)', border: '1px solid rgba(245,242,237,0.18)',
          color: 'rgba(245,242,237,0.72)', fontFamily: 'DM Sans, sans-serif',
          fontSize: 13, letterSpacing: '0.04em', cursor: 'none',
          backdropFilter: 'blur(10px)',
        }}
      >
        Explore my work
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ opacity: 0.5, fontSize: 12 }}
        >
          ↓
        </motion.span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(245,242,237,0.25)' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(245,242,237,0.35), transparent)', animation: 'scrollLine 2s ease-in-out infinite', transformOrigin: 'top' }} />
      </motion.div>

      <style>{`
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.75)} }
        @keyframes scrollLine { 0%,100%{opacity:.4;transform:scaleY(1)} 50%{opacity:.85;transform:scaleY(1.2)} }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </section>
  )
}