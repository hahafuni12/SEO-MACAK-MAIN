import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion'

const keyframes = `
  @keyframes moveDiagonalDots {
    from { background-position: 0px 0px; }
    to { background-position: 60px -60px; }
  }
`

export default function IzradaSajtova() {
  return (
    <>
    <style>{keyframes}</style>
    <div>
      <Header />

      {/* HERO SECTION - Value Proposition & CTA */}
      <section style={{ padding: '100px 24px', background: '#000', color: '#fff', textAlign: 'center', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated moving background - diagonal pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0px 0px',
            opacity: 0.08,
            animation: 'moveDiagonalDots 3s linear infinite',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '700', color: '#FDCA40' }}>Profesionalna Izrada Sajtova</h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', color: '#e0e0e0', lineHeight: '1.6' }}>
            Kreiraj snažnu online prisutnost sa modernim, brzim i SEO-optimizovanim sajtovima koji konvertuju posjetioce u klijente.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '15px 40px', fontSize: '1.1rem', background: '#FDCA40', border: 'none', borderRadius: '5px', color: '#000', cursor: 'pointer', fontWeight: '600' }}>
              Zatraži Ponudu
            </button>
            <button style={{ padding: '15px 40px', fontSize: '1.1rem', background: 'transparent', border: '2px solid #FDCA40', borderRadius: '5px', color: '#FDCA40', cursor: 'pointer', fontWeight: '600' }}>
              Pogledaj Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Trust & Authority */}
      <section style={{ padding: '80px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Zašto Izabrati Nas?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { icon: '⚡', title: 'Brzi Sajtovi', desc: 'Optimizovani za brže učitavanje - veća konverzija i bolja SEO rangiranja' },
              { icon: '🎨', title: 'Moderni Dizajn', desc: 'Responsive dizajn koji savršeno izgleda na svim uređajima' },
              { icon: '🔍', title: 'SEO Optimizacija', desc: 'Ugrađene SEO najbolje prakse od početka - rang na Google-u' },
              { icon: '📱', title: 'Mobilni First', desc: 'Prilagođeno za mobilne korisnike - većina trafika dolazi sa mobitela' },
              { icon: '🔒', title: 'Sigurnost', desc: 'SSL certifikat, zaštita podataka i redovne sigurnosne nadogradnje' },
              { icon: '💬', title: 'Podrška & Održavanje', desc: 'Dugoročna podrška, praćenje i redovne nadogradnje' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#1a1a1a', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ color: '#b0b0b0', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - What We Offer */}
      <section style={{ padding: '80px 24px', background: '#111', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Naše Usluge</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '30px', border: 'left 4px solid #FDCA40' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Razvoj Custom Sajtova</h3>
              <p style={{ color: '#c0c0c0', marginBottom: '15px' }}>Jedinstveni sajtovi napravljen od nule prema vašim potrebama i brendu.</p>
              <ul style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.8' }}>
                <li>✓ Custom HTML/CSS/JavaScript</li>
                <li>✓ React i moderne frontend tehnologije</li>
                <li>✓ Pozadinska integracija</li>
                <li>✓ Baze podataka</li>
              </ul>
            </div>

            <div style={{ padding: '30px', border: 'left 4px solid #FDCA40' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>E-Commerce Rješenja</h3>
              <p style={{ color: '#c0c0c0', marginBottom: '15px' }}>Prodaj online sa profesionalnim e-commerce platformama.</p>
              <ul style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.8' }}>
                <li>✓ Katalog proizvoda</li>
                <li>✓ Sigurna plaćanja</li>
                <li>✓ Upravljanje zalihama</li>
                <li>✓ Analitika i izvještaji</li>
              </ul>
            </div>

            <div style={{ padding: '30px', border: 'left 4px solid #FDCA40' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>SEO Optimizacija</h3>
              <p style={{ color: '#c0c0c0', marginBottom: '15px' }}>Rang na prvoj stranici Google-a sa našim SEO strategijom.</p>
              <ul style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.8' }}>
                <li>✓ Keyword istraživanje</li>
                <li>✓ On-page optimizacija</li>
                <li>✓ Technical SEO</li>
                <li>✓ Link building</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS - How We Work */}
      <section style={{ padding: '80px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Naš Proces</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Konsultacija', desc: 'Razumijevanje vašeg poslovanja i ciljeva' },
              { step: '02', title: 'Planiranje', desc: 'Straterija, sitemap i dizajn koncepta' },
              { step: '03', title: 'Razvoj', desc: 'Kodiranje i implementacija funkcionalnosti' },
              { step: '04', title: 'Testiranje', desc: 'QA, sigurnost i optimizacija performansi' },
              { step: '05', title: 'Lansiranje', desc: 'Pokretanje i praćenje' },
              { step: '06', title: 'Podrška', desc: 'Održavanje i kontinuirana poboljšanja' }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '25px', textAlign: 'center', background: '#1a1a1a', borderRadius: '8px' }}>
                <div style={{ fontSize: '2.5rem', color: '#FDCA40', fontWeight: '700', marginBottom: '10px' }}>{item.step}</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO/CASE STUDIES */}
      <section style={{ padding: '80px 24px', background: '#111', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Naši Projekti</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Studija Slučaja 1', category: 'E-Commerce', result: '+150% online prodaje' },
              { name: 'Studija Slučaja 2', category: 'Korporativni Sajt', result: 'Rang #1 za lokalne ključne riječi' },
              { name: 'Studija Slučaja 3', category: 'Portfolio Sajt', result: '+300% upita iz sajta' }
            ].map((project, idx) => (
              <div key={idx} style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', borderRadius: '8px', padding: '30px', cursor: 'pointer', transition: 'transform 0.3s' }}>
                <div style={{ height: '200px', background: '#333', borderRadius: '5px', marginBottom: '20px' }}></div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{project.name}</h3>
                <p style={{ color: '#FDCA40', fontSize: '0.9rem', marginBottom: '8px' }}>{project.category}</p>
                <p style={{ color: '#999' }}>Rezultat: <strong>{project.result}</strong></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS/SOCIAL PROOF */}
      <section style={{ padding: '80px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Šta Kažu Naši Klijenti</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Klijent 1', text: 'Odličan rad! Sajt je promijenio moj biznis.', rating: '★★★★★' },
              { name: 'Klijent 2', text: 'Profesionalan tim, brz odgovori, odličan rezultat.', rating: '★★★★★' },
              { name: 'Klijent 3', text: 'Preporuka svima koji trebaju kvalitetan sajt!', rating: '★★★★★' }
            ].map((testimonial, idx) => (
              <div key={idx} style={{ background: '#1a1a1a', padding: '25px', borderRadius: '8px', border: '1px solid #333' }}>
                <p style={{ color: '#FDCA40', marginBottom: '15px', fontSize: '1.2rem' }}>{testimonial.rating}</p>
                <p style={{ color: '#c0c0c0', marginBottom: '15px', fontStyle: 'italic' }}>"{testimonial.text}"</p>
                <p style={{ color: '#888', fontWeight: '600' }}>— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ padding: '80px 24px', background: '#111', color: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Često Postavljana Pitanja</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              { q: 'Koliko traje izrada sajtova?', a: 'Zavisi od kompleksnosti, obično 4-12 sedmica.' },
              { q: 'Koliko koštaju sajtovi?', a: 'Cijena se razlikuje - mali sajtovi od 500€, kompleksni od 2000€+.' },
              { q: 'Dobijam li SEO uključen?', a: 'Da! Svi sajtovi su SEO-optimizovani od početka.' },
              { q: 'Šta se dešava nakon lansiranja?', a: 'Pružamo 3-6 mjeseci besplatne podrške i opcije održavanja.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#1a1a1a', padding: '25px', borderRadius: '8px', border: '1px solid #333' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#FDCA40' }}>❓ {item.q}</h4>
                <p style={{ color: '#b0b0b0', lineHeight: '1.6' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Final Call To Action */}
      {/* CTA SECTION - Final Call To Action */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #FDCA40 0%, #FDD968 100%)', color: '#000', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#000' }}>Spreman Za Promjenu?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: '0.95', color: '#000' }}>
            Hajde da napravimo sajt koji će donijeti stvarne rezultate za vaš biznis.
          </p>
          <button style={{ padding: '18px 45px', fontSize: '1.1rem', background: '#000', border: 'none', borderRadius: '5px', color: '#FDCA40', cursor: 'pointer', fontWeight: '700' }}>
            Zatraži Besplatnu Konsultaciju
          </button>
        </div>
      </section>
    </div>
    </>
  )
}