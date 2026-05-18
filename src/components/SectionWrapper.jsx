import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionWrapper({ id, className = '', children, alt = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-28 ${alt ? 'section-alt' : 'section-bg'} ${className}`}
    >
      {/* Slide-up + fade reveal */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Top edge line that draws in */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: 'rgba(245,242,237,0.06)' }}
      />
    </section>
  )
}
