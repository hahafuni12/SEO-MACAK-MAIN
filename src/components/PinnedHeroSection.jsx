import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FAQSection from './FAQSection'
import logoImg from '../../LOGO MAIN MAIN.png'

export default function PinnedHeroSection() {
  const containerRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  // Track scroll progress across the 2000vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Map progress from the container's top reaching the viewport top
    // until the container's bottom reaches the viewport top (pin duration)
    offset: ['start start', 'end start'],
  })

  // Smooth the scroll progress for premium feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  // Transforms per spec
  const bgColor = useTransform(smoothProgress, [0, 0.12], ['#ffffff', '#000000'])
  const heroOpacity = useTransform(smoothProgress, [0, 0.06, 0.12], [1, 1, 0])
  const logoColor = useTransform(smoothProgress, [0, 0.12], ['#000000', '#ffffff'])

  // Container overlay that shows/hides content as background transitions - stays hidden until fully dark
  const stickyContainerOpacity = useTransform(smoothProgress, [0.12, 0.13], [0, 1])
  
  // "Šta Radimo?" TITLE - appears, stays full opacity until card 3 fades, then fades in sync with card 3
  const stataTitleOpacity = useTransform(smoothProgress, [0.12, 0.15, 0.50, 0.53], [0, 1, 1, 0])
  
  // "Šta Radimo?" animation - appears centered, moves to top-left and shrinks
  const stataTitleScale = useTransform(smoothProgress, [0.15, 0.20], [1, 0.3])
  const stataTitleY = useTransform(smoothProgress, [0.15, 0.20], [0, -350])
  const stataTitleX = useTransform(smoothProgress, [0.15, 0.20], [0, -500])
  
  // SEQUENTIAL CARDS - Šta Radimo (3 cards) - with smaller deadzone
  // Card 1: SEO
  const card1Opacity = useTransform(smoothProgress, [0.20, 0.22, 0.28, 0.31], [0, 1, 1, 0])
  const card1Y = useTransform(smoothProgress, [0.20, 0.22], [50, 0])
  
  // Card 2: Development
  const card2Opacity = useTransform(smoothProgress, [0.31, 0.33, 0.39, 0.42], [0, 1, 1, 0])
  const card2Y = useTransform(smoothProgress, [0.31, 0.33], [50, 0])
  
  // Card 3: Design
  const card3Opacity = useTransform(smoothProgress, [0.42, 0.44, 0.50, 0.53], [0, 1, 1, 0])
  const card3Y = useTransform(smoothProgress, [0.42, 0.44], [50, 0])
  
  // "Kako Radimo?" TITLE - appears centered at small scale, grows to 1, then moves to top-left and shrinks
  const kakoTitleOpacity = useTransform(smoothProgress, [0.53, 0.58, 0.67], [0, 1, 1])
  const kakoTitleScale = useTransform(smoothProgress, [0.53, 0.58, 0.67], [0.3, 1, 0.3])
  const kakoTitleY = useTransform(smoothProgress, [0.58, 0.67], [0, -350])
  const kakoTitleX = useTransform(smoothProgress, [0.58, 0.67], [0, -500])
  
  // SEQUENTIAL CARDS - Kako Radimo (3 cards) - compressed timeline, Card 6 finishes early for viewing room
  // Card 4: Discovery
  const card4Opacity = useTransform(smoothProgress, [0.67, 0.69, 0.73, 0.76], [0, 1, 1, 0])
  const card4Y = useTransform(smoothProgress, [0.67, 0.69], [50, 0])
  
  // Card 5: Strategy
  const card5Opacity = useTransform(smoothProgress, [0.76, 0.78, 0.81, 0.84], [0, 1, 1, 0])
  const card5Y = useTransform(smoothProgress, [0.76, 0.78], [50, 0])
  
  // Card 6: Results/Monitoring - only visible card
  const card6Opacity = useTransform(smoothProgress, [0.84, 0.86, 0.90, 1.0], [0, 1, 1, 1])
  const card6Y = useTransform(smoothProgress, [0.84, 0.86], [50, 0])

  useLayoutEffect(()=>{
    // ensure target has a non-static position for framer's offset calculations
    if(containerRef.current){
      containerRef.current.style.position = containerRef.current.style.position || 'relative'
      const comp = getComputedStyle(containerRef.current).position
      console.debug('[debug] container computed position:', comp)
    }
  }, [])

  // UI state derived from motion values
  const pinWrapRef = useRef(null)
  const [pinReleased, setPinReleased] = useState(false)

  // toggle sticky -> relative when progress passes 0.38 so the page continues
  useEffect(()=>{
    const unsub = smoothProgress.on('change', (p)=>{
      const released = p >= 0.35
      setPinReleased(released)
      if(pinWrapRef.current){
        pinWrapRef.current.style.position = released ? 'relative' : 'sticky'
      }
    })
    return ()=>unsub()
  }, [smoothProgress])

  useEffect(()=>{
    // subscribe to bgColor MotionValue and update CSS var so body background follows
    // set initial value
    document.documentElement.style.setProperty('--bg-color', '#FBFAF8')
    const unsubscribe = bgColor.on('change', (v)=>{
      document.documentElement.style.setProperty('--bg-color', v)
    })

    return () => unsubscribe()
  }, [bgColor])

  // Debugging: subscribe to scroll and motion values to inspect progress
  useEffect(()=>{
    let unsubScroll = () => {}
    let unsubHero = () => {}
    let unsubBg = () => {}

      try{
        unsubScroll = smoothProgress.on('change', (p)=>{
          // log derived values together
          const heroV = typeof heroOpacity.get === 'function' ? heroOpacity.get() : undefined
          const bgV = typeof bgColor.get === 'function' ? bgColor.get() : undefined
          console.debug('[debug] smoothProgress:', p, 'heroOpacity:', heroV, 'bgColor:', bgV)
        })
      }catch(e){
        console.warn('[debug] failed to subscribe to motion values', e)
      }

    // log container rect on scroll/resize to check offsets
    const logRect = ()=>{
      if(containerRef.current){
        const r = containerRef.current.getBoundingClientRect()
        console.debug('[debug] container rect', {top:r.top, bottom:r.bottom, height:r.height})
      }
    }
    window.addEventListener('scroll', logRect, {passive:true})
    window.addEventListener('resize', logRect)

    // initial
    logRect()

    return ()=>{
      try{ unsubScroll() }catch(e){}
      try{ unsubHero() }catch(e){}
      try{ unsubBg() }catch(e){}
      window.removeEventListener('scroll', logRect)
      window.removeEventListener('resize', logRect)
    }
  }, [smoothProgress, heroOpacity, bgColor])

  return (
    <>
    <div ref={containerRef} style={{ height: '1400vh', position: 'relative' }}>
      <motion.div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundColor: bgColor }} aria-hidden />

      <header className="site-header">
        <div className="container">
          <Link to="/" className="logo" onClick={handleLogoClick}>
            <img src={logoImg} alt="SEO Mačak" width="60" height="60" style={{ display: 'block', objectFit: 'contain' }} />
            <motion.span className="logo-text" style={{ color: logoColor, textDecoration: 'underline', textDecorationColor: logoColor, textDecorationThickness: '2px' }}>
              SEO<br/>
              <motion.span className="logo-sub" style={{ color: logoColor }}>
                Mačak.
              </motion.span>
            </motion.span>
          </Link>
          <nav className="nav-pill">
            <Link to="/">Početna</Link>
            <Link to="/izrada-sajtova/">Izrada sajtova</Link>
            <Link to="/seo/">SEO</Link>
            <Link to="/blog/">Blog</Link>
            <Link to="/about/">O nama</Link>
            <Link to="/kontakt/" className="btn nav-cta">Kontakt</Link>
          </nav>
        </div>
      </header>

      <div className="pin-wrap" ref={pinWrapRef} style={{ position: pinReleased ? 'relative' : 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          style={{ 
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            opacity: useTransform(smoothProgress, [0, 0.12], [0, 0]),
            pointerEvents: 'none',
            zIndex: 99
          }}
        />
        <section className="hero fullscreen">
          <div
            className="moving-dots"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: -1,
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.22) 4px, transparent 4px)',
              backgroundSize: '40px 40px',
              opacity: 0.95,
            }}
          />
          <div className="hero-inner container">
            <motion.div className="hero-center" style={{ opacity: heroOpacity }}>
              <h1 className="hero-head">Prestani da se nadaš. Počni da se <strong className="em underline">rangiraš</strong>.</h1>
              <p className="subhead">Stručna SEO optimizacija, moderni web sajtovi i jasno dizajnirana komunikacija.</p>
              <motion.div 
                className="scroll-arrow"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5 L30 30 L50 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      
      {/* STICKY CONTAINER FOR SEQUENTIAL CARDS */}
      <motion.div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: 50, opacity: stickyContainerOpacity, pointerEvents: 'none' }}>
        
        {/* ŠTA RADIMO TITLE - appears and animates to top-left */}
        <motion.h2 className="section-title" style={{ opacity: stataTitleOpacity, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 'clamp(4rem, 15vw, 12rem)', margin: 0, zIndex: 200, whiteSpace: 'nowrap', x: stataTitleX, y: stataTitleY, scale: stataTitleScale }}>
          Šta Radimo?
        </motion.h2>

        {/* CARD 1: SEO - Left Image, Right Text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: card1Opacity,
            y: card1Y,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px'
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '60px', alignItems: 'center' }}>
            <div style={{ flex: 1, minHeight: '400px', background: '#1a1a1a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <span>SEO Image</span>
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <h3 style={{ fontSize: '2.5rem', marginTop: 0, marginBottom: '20px' }}>SEO Optimizacija</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Poboljšavamo vidljivost vašeg sajta na pretraživačima kroz detaljnu analizu ključnih reči, optimizaciju on-page elemenata, izgradnju backlink-ova i kontinuirano praćenje performansi. Naš pristup je sveobuhvatan i fokusiran na održive rezultate.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Development - Right Image, Left Text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: card2Opacity,
            y: card2Y,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px'
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '60px', alignItems: 'center', flexDirection: 'row-reverse' }}>
            <div style={{ flex: 1, minHeight: '400px', background: '#1a1a1a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <span>Development Image</span>
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <h3 style={{ fontSize: '2.5rem', marginTop: 0, marginBottom: '20px' }}>Web Development</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Kreiramo moderne, brze i skalabilne web sajtove koristeći najnovije tehnologije. Svaki sajt je optimizovan za performanse, mobilne uređaje i korisničko iskustvo. Naš kod je čist, skalabilan i lakšan za održavanje.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: Design - Left Image, Right Text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: card3Opacity,
            y: card3Y,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px'
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '60px', alignItems: 'center' }}>
            <div style={{ flex: 1, minHeight: '400px', background: '#1a1a1a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <span>Design Image</span>
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <h3 style={{ fontSize: '2.5rem', marginTop: 0, marginBottom: '20px' }}>Dizajn</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Kreiramo vizuelno privlačne i funkcionalne interfejse koji odskaču. Naš dizajn je baziran na istraživanju korisnika, pristupačnosti i modernim trendovima. Svaki detalj je pažljivo razmišljen.
              </p>
            </div>
          </div>
        </motion.div>

        {/* KAKO RADIMO TITLE - appears and animates to top-left */}
        <motion.h2 className="section-title" style={{ opacity: kakoTitleOpacity, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 'clamp(4rem, 15vw, 12rem)', margin: 0, zIndex: 200, whiteSpace: 'nowrap', x: kakoTitleX, y: kakoTitleY, scale: kakoTitleScale }}>
          Kako Radimo?
        </motion.h2>

        {/* KAKO RADIMO TITLE - appears with opacity wave effect then animates to top-left */}
        <motion.h2 className="section-title" style={{ opacity: kakoTitleOpacity, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 'clamp(4rem, 15vw, 12rem)', margin: 0, zIndex: 200, whiteSpace: 'nowrap', y: kakoTitleY, x: kakoTitleX, scale: kakoTitleScale }}>
          Kako Radimo?
        </motion.h2>

        {/* CARD 4: Discovery - Left Image, Right Text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: card4Opacity,
            y: card4Y,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px'
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '60px', alignItems: 'center' }}>
            <div style={{ flex: 1, minHeight: '400px', background: '#1a1a1a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <span>Discovery Image</span>
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <h3 style={{ fontSize: '2.5rem', marginTop: 0, marginBottom: '20px' }}>Otkrivanje & Analiza</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Počinjemo detaljnom analizom vašeg poslovanja, industrije, konkurencije i ciljne audience. Razumevamo vaše ciljeve i izazove kako bismo kreirali strategiju koja je potpuno prilagođena vašim potrebama.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CARD 5: Strategy - Right Image, Left Text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: card5Opacity,
            y: card5Y,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px'
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '60px', alignItems: 'center', flexDirection: 'row-reverse' }}>
            <div style={{ flex: 1, minHeight: '400px', background: '#1a1a1a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <span>Strategy Image</span>
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <h3 style={{ fontSize: '2.5rem', marginTop: 0, marginBottom: '20px' }}>Strategija</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Razvijamo jasnu, merljivu strategiju koja kreira putanju od trenutnog stanja do željenih rezultata. Definišemo KPI-je, vremensku liniju i plan akcije sa tačno definisanim etapama.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CARD 6: Results & Monitoring - Right Image, Left Text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: card6Opacity,
            y: card6Y,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px'
          }}
        >
          <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', gap: '60px', alignItems: 'center', flexDirection: 'row-reverse' }}>
            <div style={{ flex: 1, minHeight: '400px', background: '#1a1a1a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <span>Results Image</span>
            </div>
            <div style={{ flex: 1, color: '#fff' }}>
              <h3 style={{ fontSize: '2.5rem', marginTop: 0, marginBottom: '20px' }}>Rezultati & Monitoring</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Pratimo sve metrike i KPI-je kako bismo osigurali da projekat dostiže željene rezultate. Redovni izveštaji i analize omogućavaju nam da kontinuirano optimizujemo strategiju i donosimo podatkom vođene odluke.
              </p>
            </div>
          </div>
        </motion.div>
        
      </motion.div>
    </div>

    {/* PORTFOLIO SECTION */}
    <section style={{ minHeight: '100vh', padding: '100px 24px', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>Portfolio</h2>
        <p style={{ fontSize: '1.2rem', color: '#aaa', textAlign: 'center', marginBottom: '80px' }}>Pogledajte jedan od mojih radova</p>
        
        {/* PORTFOLIO CONTAINER WITH ARROWS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
          
          {/* LEFT ARROW */}
          <div style={{ fontSize: '80px', color: '#FDCA40', fontWeight: 'bold', opacity: 0.6 }}>
            →
          </div>

          {/* HIGHLIGHT PROJECT CARD */}
          <div style={{ background: '#1a1a1a', borderRadius: '12px', overflow: 'hidden', flex: 1, maxWidth: '900px' }}>
            <div style={{ height: '400px', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '1.2rem' }}>
              Project Image
            </div>
            <div style={{ padding: '50px' }}>
              <h3 style={{ fontSize: '2.5rem', marginTop: 0, marginBottom: '20px' }}>E-Commerce Platforma</h3>
              <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.8', marginBottom: '30px' }}>
                Kompletna optimizacija i modernizacija e-commerce platforme. Kroz detaljnu SEO analizu, dizajnersko unapređenje i tehničku optimizaciju, dostigli smo povećanje konverzije od 45% i poboljšanje brzine učitavanja za 60%.
              </p>
              
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ color: '#fff', marginBottom: '15px' }}>Rezultati:</h4>
                <ul style={{ color: '#aaa', lineHeight: '2', marginLeft: '20px' }}>
                  <li>+45% povećanje konverzije</li>
                  <li>+60% brža učitavanja stranica</li>
                  <li>Top 3 rangiranje za ciljne ključne reči</li>
                  <li>+200% organskog trafika</li>
                </ul>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ color: '#fff', marginBottom: '15px' }}>Usluge:</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '0.95rem' }}>SEO Optimizacija</span>
                  <span style={{ background: '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '0.95rem' }}>Web Design</span>
                  <span style={{ background: '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '0.95rem' }}>React Development</span>
                  <span style={{ background: '#333', padding: '8px 16px', borderRadius: '20px', fontSize: '0.95rem' }}>Performance</span>
                </div>
              </div>

              <button style={{ background: '#FDCA40', color: '#000', border: 'none', padding: '12px 30px', fontSize: '1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                Saznaj više
              </button>
            </div>
          </div>

          {/* RIGHT ARROW */}
          <div style={{ fontSize: '80px', color: '#FDCA40', fontWeight: 'bold', opacity: 0.6, transform: 'scaleX(-1)' }}>
            →
          </div>

        </div>
      </div>
    </section>

    {/* FAQ SECTION */}
    <FAQSection />

    {/* EXTENSION SECTION */}
    <section style={{ minHeight: '50vh', padding: '100px 24px', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', pointerEvents: 'auto' }}>
      {/* FADE OUT OVERLAY AT TOP */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '400px',
        background: 'linear-gradient(180deg, #1a1a1a 0%, rgba(26, 26, 26, 0.7) 30%, rgba(26, 26, 26, 0.4) 60%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      <div style={{ maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
        {/* LEFT SIDE - LARGE TEXT */}
        <h2 style={{
          fontSize: 'clamp(3rem, 12vw, 7rem)',
          fontWeight: 900,
          lineHeight: '1.1',
          margin: '0',
          color: '#fff'
        }}>
          Imate <span style={{ color: '#FDCA40' }}>stručnija</span> pitanja?
        </h2>

        {/* RIGHT SIDE - EMPTY */}
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{ background: '#000', color: '#fff', padding: '60px 24px 30px', borderTop: '1px solid #333', position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '80px', marginBottom: '60px', position: 'relative', alignItems: 'flex-start' }}>
          {/* LEFT SIDE - COLUMNS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(150px, auto))', gap: '40px', flex: '0 0 auto' }}>
            {/* FOOTER COLUMN 1 - BRAND */}
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>SEO Mačak</h3>
              <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '0.9rem' }}>
                Stručna SEO optimizacija, web development i dizajn za vaš biznis.
              </p>
            </div>

            {/* FOOTER COLUMN 2 - LINKS */}
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Linkovi</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Početna</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/izrada-sajtova/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Izrada sajtova</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/seo/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>SEO</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/blog/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Blog</Link></li>
              </ul>
            </div>

            {/* FOOTER COLUMN 3 - MORE LINKS */}
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Kompanija</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><Link to="/about/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>O nama</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/kontakt/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Kontakt</Link></li>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Privatnost</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Uslovi</a></li>
              </ul>
            </div>

            {/* FOOTER COLUMN 4 - CONTACT */}
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Kontakt</h4>
              <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>email@example.com</p>
              <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>+381 (0) 123 456 789</p>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Beograd, Srbija</p>
            </div>
          </div>

          {/* RIGHT SIDE - BUTTON */}
          <div style={{ marginLeft: 'auto', marginRight: '-210npx', paddingRight: '24px', display: 'flex', alignItems: 'flex-start', marginTop: '40px' }}>
            <Link to="/kontakt/" style={{ textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer' }}>
              <div style={{
                background: '#FDCA40',
                color: '#000',
                padding: '20px 50px',
                fontSize: '1.3rem',
                borderRadius: '6px',
                fontWeight: '700',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: 'auto',
                display: 'inline-block',
                whiteSpace: 'nowrap'
              }} onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px) scale(1.08)';
                e.target.style.boxShadow = '0 0 50px rgba(253, 202, 64, 0.8), 0 0 80px rgba(253, 202, 64, 0.4), 0 15px 40px rgba(0, 0, 0, 0.3)';
              }} onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }}>
                Kontakt
              </div>
            </Link>
          </div>
        </div>

      {/* FOOTER BOTTOM */}
      <div style={{ borderTop: '1px solid #333', paddingTop: '30px', textAlign: 'center', color: '#666' }}>
        <p style={{ margin: 0 }}>© 2024 SEO Mačak. Sva prava zadržana.</p>
      </div>
    </div>
    </footer>
    </>
  )
}
