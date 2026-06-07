// import { Building2, Heart, Mail, Phone, MapPin } from 'lucide-react'

// export default function Footer() {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer style={{
//       position: 'relative',
//       zIndex: 10,
//       background: '#ffffff',
//       borderTop: '2px solid #f3f4f6',
//       boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
//     }}>
//       {/* Responsive grid: single column on mobile, three columns on md+ */}
//       <style>{`
//         .footer-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 2rem;
//           align-items: start;
//         }
//         @media (min-width: 768px) {
//           .footer-grid {
//             grid-template-columns: 1fr 1fr 1fr;
//           }
//         }
//       `}</style>

//       <section style={{
//         width: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         padding: '4rem 2rem',
//       }}>
//         <div style={{
//           width: '100%',
//           maxWidth: '1280px',
//           margin: '0 auto'
//         }}>
//           <div className="footer-grid">
//             {/* Quick Links — padded left */}
//             <div style={{ paddingLeft: '0.5rem' }}>
//               <h3 style={{
//                 fontSize: '0.75rem',
//                 fontWeight: 600,
//                 color: '#6b7280',
//                 textTransform: 'uppercase',
//                 letterSpacing: '0.05em',
//                 marginBottom: '0.5rem'
//               }}>
//                 Quick Links
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
//                 <a href="#" style={{ fontSize: '0.875rem', color: '#4b5563', textDecoration: 'none' }}>Find a Home</a>
//                 <a href="#" style={{ fontSize: '0.875rem', color: '#4b5563', textDecoration: 'none' }}>Price Prediction</a>
//                 <a href="#" style={{ fontSize: '0.875rem', color: '#4b5563', textDecoration: 'none' }}>How It Works</a>
//                 <a href="#" style={{ fontSize: '0.875rem', color: '#4b5563', textDecoration: 'none' }}>Success Stories</a>
//               </div>
//             </div>

//             {/* HomeVista Brand — centered */}
//             <div style={{ textAlign: 'center' }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '0.05rem'
//               }}>
//                 <span style={{
//                   fontSize: '1rem',
//                   fontWeight: 700,
//                   fontFamily: 'Outfit, sans-serif',
//                   color: '#f20b0b'
//                 }}>
//                   HomeVista
//                 </span>
//               </div>
//               <p style={{
//                 fontSize: '0.85rem',
//                 color: '#3e06f8',
//                 maxWidth: '20rem',
//                 margin: '0.5rem auto 0',
//                 whiteSpace: 'nowrap'
//               }}>
//                 AI-powered real estate platform delivering smart property predictions and personalized recommendations.
//               </p>
//             </div>

//             {/* Contact — padded right */}
//             <div style={{ paddingRight: '0.05rem' }}>
//               <h3 style={{
//                 fontSize: '0.75rem',
//                 fontWeight: 600,
//                 color: '#6b7280',
//                 textTransform: 'uppercase',
//                 letterSpacing: '0.05em',
//                 marginBottom: '0.05rem'
//               }}>
//                 Contact
//               </h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
//                   <Mail size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
//                   <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>hello@homevista.com</span>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
//                   <Phone size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
//                   <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>+1 (800) 123-4567</span>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
//                   <MapPin size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
//                   <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>123 AI Drive, San Francisco, CA</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Bottom Copyright Bar */}
//       <div style={{
//         borderTop: '1px solid #f3f4f6',
//         padding: '1.5rem 2rem',
//         textAlign: 'center'
//       }}>
//         <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
//           &copy; {currentYear} HomeVista — AI Housing Insights
//         </p>
//       </div>
//     </footer>
//   )
// }


import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      background: '#ffffff',
      borderTop: '2px solid #f3f4f6',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
    }}>
      {/* Responsive grid: 1 column on mobile, 3 columns on md+ */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr auto 1fr;
          }
        }
        .footer-link {
          color: #4b5563;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s, text-decoration 0.2s;
        }
        .footer-link:hover {
          color: #dc2626;
          text-decoration: underline;
        }
      `}</style>

      {/* Reduced vertical padding from 4rem to 2.5rem for a more compact footer */}
      <section style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',      // ← height reduced
      }}>
        <div style={{
          width: '100%',
          margin: '0 10px'
        }}>
          <div className="footer-grid">
            {/* Quick Links - left column */}
            <div style={{ textAlign: 'left' }}>
              <h3 style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem'
              }}>
                Quick Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#home" className="footer-link">Find a Home</a>
                <a href="#property" className="footer-link">Properties</a>
                <a href="#features" className="footer-link">Features</a>
                <a href="#reviews" className="footer-link">Success Stories</a>
              </div>
            </div>

            {/* Brand column - centered on desktop, always centered on mobile */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  color: '#dc2626'
                }}>
                  HomeVista
                </span>
              </div>
              {/* FIX 1: Removed whiteSpace: 'nowrap', added max-width and auto margins for natural wrapping */}
              <p style={{
                fontSize: '0.85rem',
                color: '#4b5563',
                maxWidth: '30rem',
                margin: '0.5rem auto 0',
                lineHeight: 1.6
              }}>
                AI-powered real estate platform delivering smart property predictions and personalized recommendations.
              </p>
            </div>

            {/* Contact column - right-aligned on desktop, left-aligned on mobile */}
            {/* FIX 2: Heading and details now share the same text alignment */}
            <div style={{ textAlign: 'right' }}>
              <h3 style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem'
              }}>
                Contact
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <Mail size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>hello@homevista.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <Phone size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>+1 (800) 123-4567</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <MapPin size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>123 AI Drive, San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright bar - unchanged */}
      <div style={{
        borderTop: '1px solid #f3f4f6',
        padding: '0.5rem 2rem',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
          © {currentYear} HomeVista — AI Housing Insights
        </p>
      </div>
    </footer>
  )
}