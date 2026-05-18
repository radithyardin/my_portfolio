import { motion } from 'framer-motion'

export default function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="fixed bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
    >
      <div
        className="w-px h-9 origin-top"
        style={{
          background: 'linear-gradient(to bottom, rgba(245,242,237,0.5), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes scrollLine {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.85; transform: scaleY(1.2); }
        }
      `}</style>
    </motion.div>
  )
}
