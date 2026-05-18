import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import SectionLabel from "../components/SectionLabel";

const categories = [
  {
    name: "AI / ML",
    skills: [
      { name: "LLM Fine-tuning", level: 92 },
      { name: "LangChain / LangGraph", level: 88 },
      { name: "RAG Pipelines", level: 90 },
      { name: "OpenAI & Anthropic APIs", level: 95 },
      { name: "PyTorch", level: 75 },
      { name: "Hugging Face", level: 82 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 82 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 78 },
      { name: "Vite", level: 85 },
      { name: "Three.js", level: 60 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "FastAPI / Python", level: 88 },
      { name: "Node.js / Express", level: 80 },
      { name: "PostgreSQL", level: 78 },
      { name: "Redis", level: 70 },
      { name: "Docker", level: 82 },
      { name: "AWS / GCP", level: 72 },
    ],
  },
];

function SkillBar({ name, level, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="group"
    >
      <div className="flex justify-between mb-1.5">
        <span className="font-sans text-[0.8rem] text-cream/75">{name}</span>
        <span className="font-sans text-[0.7rem] text-cream/35 tabular-nums">
          {level}%
        </span>
      </div>
      <div className="h-[3px] bg-cream/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-cream/60"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{
            duration: 0.9,
            delay: 0.05 * index + 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="skills" alt>
      <div className="max-w-6xl mx-auto w-full">
        <SectionLabel
          number="02"
          title={<span style={{ fontFamily: "vt323" }}>Skills</span>}
        />

        {/* Tab switcher */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              className={`font-sans text-[0.78rem] tracking-[0.05em] px-5 py-2 rounded-full border transition-all duration-250 cursor-none ${
                active === i
                  ? "bg-cream/12 border-cream/25 text-cream"
                  : "border-cream/10 text-cream/40 hover:text-cream/65 hover:border-cream/18"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div ref={ref} className="grid md:grid-cols-2 gap-x-16 gap-y-5">
          {categories[active].skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              {...skill}
              index={i}
              inView={inView || true}
            />
          ))}
        </div>

        {/* Tech cloud */}
        <div className="mt-16 pt-12 border-t border-cream/8">
          <p className="font-sans text-[0.65rem] uppercase tracking-widest text-cream/30 mb-6">
            Also familiar with
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Supabase",
              "Prisma",
              "GraphQL",
              "Pinecone",
              "Weaviate",
              "n8n",
              "Zapier",
              "Vercel",
              "Cloudflare",
              "Figma",
              "Linear",
              "Notion API",
            ].map((t) => (
              <span
                key={t}
                className="font-sans text-[0.75rem] text-cream/45 glass rounded-full px-3.5 py-1.5 hover:text-cream/75 transition-colors duration-200 cursor-none"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
