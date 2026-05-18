import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const cards = [
  {
    label: 'AI Engineering',
    sub: 'LLMs · RAG · Fine-tuning',
    color: '#1a2a1f',
    accent: '#4a9e6a',
    icon: '⬡',
  },
  {
    label: 'Full-Stack Dev',
    sub: 'React · FastAPI · Node.js',
    color: '#1a1a2e',
    accent: '#6a4a9e',
    icon: '◈',
  },
  {
    label: 'Product Thinking',
    sub: 'Design · Shipping · Impact',
    color: '#2e1a1a',
    accent: '#9e4a4a',
    icon: '◎',
  },
]

function StackCard({ card, index, total, scrollYProgress }) {
  const start = index / (total + 1)
  const end = (index + 1) / (total + 1)

  const scale = useTransform(scrollYProgress, [start, end], [1, 0.88])
  const y = useTransform(scrollYProgress, [start, end], ['0%', '-12%'])
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0.6])
  const zIndex = total - index

  return (
    <motion.div
      style={{ scale, y, opacity, zIndex, position: 'sticky', top: `${80 + index * 18}px` }}
      className="w-full max-w-2xl mx-auto mb-4"
    >
      <div
        className="rounded-3xl p-10 flex items-center justify-between overflow-hidden relative"
        style={{
          background: card.color,
          border: `1px solid ${card.accent}30`,
          minHeight: 180,
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${card.accent}60, transparent 65%)`,
          }}
        />

        {/* Left — text */}
        <div className="relative z-10">
          <p
            className="font-sans text-[0.65rem] uppercase tracking-[0.2em] mb-3"
            style={{ color: `${card.accent}cc` }}
          >
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3
            className="font-serif text-[2rem] font-normal leading-none mb-2"
            style={{ color: '#f5f2ed' }}
          >
            {card.label}
          </h3>
          <p className="font-sans font-light text-[0.82rem]" style={{ color: 'rgba(245,242,237,0.5)' }}>
            {card.sub}
          </p>
        </div>

        {/* Right — big icon */}
        <div
          className="relative z-10 text-[5rem] leading-none select-none"
          style={{ color: `${card.accent}40` }}
        >
          {card.icon}
        </div>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full"
          style={{ background: `${card.accent}10` }}
        />
      </div>
    </motion.div>
  )
}

export default function ScrollStack() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `${cards.length * 60 + 100}vh`,
        background: '#0a0908',
      }}
    >
      {/* Sticky canvas */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-cream/28 mb-10"
        >
          What I bring
        </motion.p>

        {/* Stack of cards */}
        <div className="w-full relative" style={{ maxWidth: 680 }}>
          {cards.map((card, i) => (
            <StackCard
              key={card.label}
              card={card}
              index={i}
              total={cards.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
