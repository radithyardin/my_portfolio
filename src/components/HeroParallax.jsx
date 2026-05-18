import { useEffect, useRef } from 'react'

export default function HeroParallax({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      if (scrollY > vh * 1.2) return
      const progress = Math.min(scrollY / vh, 1)
      el.style.transform = `translateY(${-progress * 55}px)`
      el.style.opacity = String(1 - progress * 0.35)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        willChange: 'transform, opacity',
        width: '100%',
        height: '100vh',        // Pastikan wrapper penuh
        display: 'flex',        // Pakai flex agar children bisa stretch
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center konten Hero secara vertikal
      }}
    >
      {children}
    </div>
  )
}