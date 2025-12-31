import React, { useContext } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { PageTransitionContext } from './PageTransition'

export default function Link({ to, children, ...props }) {
  const navigate = useNavigate()
  const { setIsTransitioning } = useContext(PageTransitionContext)

  const handleClick = (e) => {
    // If it's an external link or has special attributes, let it through
    if (props.target === '_blank' || props.download || e.ctrlKey || e.metaKey) {
      return
    }

    e.preventDefault()
    setIsTransitioning(true)
    
    // Wait for animation to play, then navigate
    // The overlay will stay visible until the new page mounts (handled in PageTransition useEffect)
    setTimeout(() => {
      window.scrollTo(0, 0) // Scroll to top for better UX
      navigate(to)
    }, 300)
  }

  return (
    <RouterLink to={to} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  )
}
