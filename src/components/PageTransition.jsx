import React, { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../../LOGO MAIN MAIN.png'

export const PageTransitionContext = createContext()

export default function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const location = useLocation()

  // Monitor actual route changes and keep overlay visible until new page is mounted
  useEffect(() => {
    if (isTransitioning) {
      // Wait for the new page to mount and render, then fade out overlay
      // Adding 200ms buffer to ensure smooth transition
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [isTransitioning, location])

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#000',
              zIndex: 9999,
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px'
            }}
          >
            <motion.img
              src={logoImg}
              alt="SEO Mačak"
              initial={{ scale: 0.8, opacity: 0, x: -50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain'
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              style={{
                color: '#FDCA40',
                fontSize: '5rem',
                fontWeight: '700',
                fontFamily: 'Poppins, Inter, system-ui, Arial, sans-serif',
                lineHeight: '1.1'
              }}
            >
              SEO<br/>
              <span style={{ fontSize: '4rem', fontWeight: '600' }}>Mačak.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PageTransitionContext.Provider>
  )
}
