import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'
import ArrowIcon from '../components/ArrowIcon'

const projects = [
  {
    id: 0,
    title: 'Aether Chat',
    tagline: 'AI customer support platform',
    desc: 'A production-ready conversational AI platform with RAG over company docs, multi-language support, and a real-time analytics dashboard. Handles 50k+ sessions/month.',
    tags: ['LangGraph', 'RAG', 'Next.js', 'FastAPI', 'Pinecone'],
    year: '2024',
    status: 'Live',
    color: '#b8e0c8',
    link: '#',
  },
  {
    id: 1,
    title: 'DocuMind',
    tagline: 'Intelligent document processor',
    desc: 'Upload any PDF, contract, or report and ask questions in plain language. Built with multi-modal embeddings, table extraction, and a clean React interface.',
    tags: ['OpenAI', 'Embeddings', 'React', 'Python', 'Supabase'],
    year: '2024',
    status: 'Live',
    color: '#c4d4e8',
    link: '#',
  },
  {
    id: 2,
    title: 'Fine-Tune Studio',
    tagline: 'No-code model fine-tuning UI',
    desc: 'A drag-and-drop interface for preparing datasets, running fine-tune jobs via Hugging Face, and evaluating results — without writing a single line of code.',
    tags: ['Hugging Face', 'React', 'Node.js', 'Docker'],
    year: '2023',
    status: 'Open Source',
    color: '#e8dcc4',
    link: '#',
  },
  {
    id: 3,
    title: 'Motion Dashboard',
    tagline: 'Real-time data visualization suite',
    desc: 'An animated executive dashboard connecting to PostgreSQL, showing live KPIs with cinematic chart transitions. Built for a logistics company serving 5 provinces.',
    tags: ['React', 'D3.js', 'Framer Motion', 'PostgreSQL', 'WebSocket'],
    year: '2023',
    status: 'Client Work',
    color: '#ddc4e8',
    link: '#',
  },
]

const statusColor = {
  'Live':        'text-[#7ecf8e]',
  'Open Source': 'text-[#c4d4e8]',
  'Client Work': 'text-cream/45',
}

export default function Projects() {
  const [hovered, setHovered] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <SectionWrapper id="projects" alt>
         <div className="max-w-6xl mx-auto w-full">
           <SectionLabel
             number="04"
             title={<span style={{ fontFamily: "vt323" }}>Projects</span>}
           />

        <div ref={ref} className="space-y-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.link}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 * i }}
              className={`group flex flex-col md:flex-row md:items-center gap-5 p-6 md:p-8 rounded-2xl border border-cream/8 no-underline transition-all duration-300 cursor-none ${
                hovered === p.id ? 'bg-cream/7 border-cream/16' : 'hover:bg-cream/4'
              }`}
            >
              {/* Year */}
              <span className="font-sans text-[0.65rem] tabular-nums text-cream/28 md:w-10 shrink-0">{p.year}</span>

              {/* Color dot */}
              <div className="hidden md:flex w-3 h-3 rounded-full shrink-0 transition-all duration-300 group-hover:scale-125"
                style={{ backgroundColor: p.color, opacity: hovered === p.id ? 1 : 0.4 }} />

              {/* Title + desc */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap mb-1.5">
                  <h3 className="font-serif text-[1.25rem] text-cream font-normal">{p.title}</h3>
                  <span className="font-sans text-[0.75rem] text-cream/45 italic">{p.tagline}</span>
                </div>
                <AnimatePresence>
                  {hovered === p.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-sans font-light text-[0.85rem] text-cream/55 leading-relaxed mb-3 overflow-hidden"
                    >
                      {p.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(tag => (
                    <span key={tag} className="font-sans text-[0.68rem] text-cream/38 glass rounded-full px-2.5 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Status + arrow */}
              <div className="flex items-center gap-4 shrink-0">
                <span className={`font-sans text-[0.7rem] uppercase tracking-wider ${statusColor[p.status] || 'text-cream/40'}`}>
                  {p.status}
                </span>
                <ArrowIcon className="text-cream/25 group-hover:text-cream/70 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-200" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
