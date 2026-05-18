import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const hobbies = [
  {
    emoji: '📷',
    title: 'Street Photography',
    desc: 'I wander cities with my Ricoh GR IIIx looking for light, shadow, and human moments. Urban geometry is endlessly fascinating.',
    color: '#e8dcc4',
  },
  {
    emoji: '🎵',
    title: 'Music Production',
    desc: 'Lo-fi beats, ambient pads, and the occasional jazz-inflected sample. Ableton is my creative sandbox when the code is done.',
    color: '#c4d4e8',
  },
  {
    emoji: '📚',
    title: 'Technical Writing',
    desc: 'I write about AI, systems design, and the philosophy of building things. I believe clear writing is clear thinking.',
    color: '#b8e0c8',
  },
  {
    emoji: '🏔️',
    title: 'Trail Running',
    desc: 'Weekly runs through Jakarta parks and — when I can escape — through the volcanic trails of West Java.',
    color: '#ddc4e8',
  },
  {
    emoji: '♟️',
    title: 'Chess',
    desc: 'Rapid on Lichess. Rated ~1600. I\'m interested in engine analysis and the intersection of AI & chess theory.',
    color: '#e8c4c4',
  },
  {
    emoji: '🌐',
    title: 'Open Source',
    desc: 'I contribute to AI tooling projects and maintain a couple of small libraries used by the Indonesian dev community.',
    color: '#c8e8c4',
  },
]

export default function Hobbies() {
  const [hovered, setHovered] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionWrapper id="hobbies" alt>
         <div className="max-w-6xl mx-auto w-full">
           <SectionLabel
             number="05"
             title={<span style={{ fontFamily: "vt323" }}>Hobbies</span>}
           />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="glass rounded-2xl p-6 transition-all duration-300 cursor-none"
              style={{
                background: hovered === i ? `${h.color}12` : 'rgba(245,242,237,0.05)',
                borderColor: hovered === i ? `${h.color}35` : 'rgba(245,242,237,0.1)',
              }}
            >
              <motion.div
                className="text-3xl mb-4 inline-block"
                animate={hovered === i ? { y: [-0, -6, 0] } : {}}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {h.emoji}
              </motion.div>
              <h3 className="font-serif text-[1.1rem] text-cream font-normal mb-2">{h.title}</h3>
              <p className="font-sans font-light text-[0.83rem] text-cream/55 leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
