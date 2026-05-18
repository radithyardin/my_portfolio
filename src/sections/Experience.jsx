import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionLabel from '../components/SectionLabel'

const jobs = [
  {
    id: 0,
    role: 'Senior AI Engineer',
    company: 'Aether AI',
    period: '2023 — Present',
    type: 'Full-time',
    desc: 'Lead the design and deployment of LLM-powered features across the product suite. Built a retrieval-augmented generation pipeline processing 2M+ documents with sub-500ms latency. Collaborated with product to ship three AI features from 0→1.',
    tags: ['LangGraph', 'RAG', 'FastAPI', 'Next.js', 'AWS'],
  },
  {
    id: 1,
    role: 'Full-Stack Engineer',
    company: 'Kento Studio',
    period: '2022 — 2023',
    type: 'Full-time',
    desc: 'Built client-facing React applications with a focus on animation-heavy interfaces. Integrated OpenAI models into two SaaS products, reducing manual content generation time by 70%.',
    tags: ['React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Vercel'],
  },
  {
    id: 2,
    role: 'ML Engineer (Contract)',
    company: 'Mayar.ID',
    period: '2021 — 2022',
    type: 'Contract',
    desc: 'Developed NLP pipelines for payment intent classification and automated receipt parsing. Improved model accuracy from 74% to 91% through iterative fine-tuning and dataset curation.',
    tags: ['Python', 'Hugging Face', 'spaCy', 'Docker', 'GCP'],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Freelance',
    period: '2020 — 2021',
    type: 'Freelance',
    desc: 'Designed and built portfolio sites, e-commerce frontends, and custom dashboards for clients across Indonesia and Southeast Asia.',
    tags: ['React', 'Tailwind', 'Firebase', 'Framer Motion'],
  },
]

export default function Experience() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
   <SectionWrapper id="experience" alt>
        <div className="max-w-6xl mx-auto w-full">
          <SectionLabel
            number="03"
            title={<span style={{ fontFamily: "vt323" }}>Experience</span>}
          />

        <div ref={ref} className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          {/* Sidebar */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {jobs.map((job, i) => (
              <motion.button
                key={job.id}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 * i }}
                className={`cursor-none text-left shrink-0 md:shrink px-4 py-3 rounded-xl border transition-all duration-200 ${
                  active === i
                    ? 'bg-cream/10 border-cream/22 text-cream'
                    : 'border-transparent text-cream/40 hover:text-cream/65 hover:bg-cream/5'
                }`}
              >
                <div className="font-sans text-[0.78rem] font-medium whitespace-nowrap">{job.company}</div>
                <div className="font-sans text-[0.65rem] text-cream/35 mt-0.5">{job.period}</div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                <div>
                  <h3 className="font-serif text-[1.6rem] text-cream font-normal mb-1">{jobs[active].role}</h3>
                  <span className="font-sans text-[0.8rem] text-cream/55">{jobs[active].company} · {jobs[active].period}</span>
                </div>
                <span className="glass rounded-full px-3 py-1 font-sans text-[0.68rem] text-cream/50 uppercase tracking-wider">
                  {jobs[active].type}
                </span>
              </div>

              <p className="font-sans font-light text-cream/65 text-[0.93rem] leading-[1.85] mb-8">
                {jobs[active].desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {jobs[active].tags.map(tag => (
                  <span key={tag} className="font-sans text-[0.72rem] text-cream/50 glass rounded-full px-3.5 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  )
}
