import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',      href: 'about' },
  { label: 'Skills',     href: 'skills' },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects',   href: 'projects' },
  { label: 'Hobbies',    href: 'hobbies' },
  { label: 'Contact',    href: 'contact' },
  { label: 'Chat Room',    href: 'chat' },
]

export default function Navbar() {
  const [pastHero, setPastHero] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('hero')
      if (!heroEl) return
      const heroBottom = heroEl.getBoundingClientRect().bottom
      setPastHero(heroBottom < 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    links.forEach(({ href }) => {
      const el = document.getElementById(href)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.nav
          key="navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4"
          style={{
            background: 'rgba(13,12,11,0.85)',
            borderBottom: '1px solid rgba(245,242,237,0.07)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          <button
            onClick={() => scrollTo('hero')}
            className="font-serif text-cream text-[1rem] font-normal tracking-wide opacity-85 cursor-none hover:opacity-100 transition-opacity duration-200 bg-transparent border-none"
          >
            <span style={{ fontFamily: "vt323" }}>It's me</span>
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {links.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className={`relative px-3.5 py-1.5 rounded-full font-sans text-[0.72rem] tracking-[0.04em] transition-all duration-200 cursor-none bg-transparent border-none ${
                  active === href ? 'text-cream' : 'text-cream/40 hover:text-cream/75'
                }`}
              >
                {active === href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(245,242,237,0.09)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[0.67rem] font-sans uppercase tracking-widest text-cream/38">
            <span className="w-[5px] h-[5px] rounded-full bg-[#7ecf8e]" style={{ animation: 'pulseDot 2.5s ease-in-out infinite' }} />
            Open to work
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
