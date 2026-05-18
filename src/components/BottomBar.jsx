import { motion } from 'framer-motion'

const socials = [
  { label: 'GitHub',   href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter',  href: 'https://twitter.com' },
]

export default function BottomBar() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-6"
    >
      <span className="font-sans text-[0.68rem] font-normal uppercase tracking-widest text-cream/38">
        Jakarta, Indonesia
      </span>

      <div className="flex items-center gap-6">
        {socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[0.68rem] font-normal uppercase tracking-[0.06em] text-cream/38 no-underline hover:text-cream/80 transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>
    </motion.footer>
  )
}
