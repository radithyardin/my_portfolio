import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionLabel({ number, title }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="flex items-center gap-4 mb-14 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="font-sans text-[0.63rem] text-cream/28 tracking-[0.14em] uppercase tabular-nums shrink-0"
      >
        {number}
      </motion.span>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="h-px w-12 origin-left shrink-0"
        style={{ background: 'rgba(245,242,237,0.15)' }}
      />

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '105%' }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-serif text-[2.4rem] md:text-[3.2rem] font-normal text-cream leading-none tracking-tight"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  )
}
