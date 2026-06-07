// import React from 'react'
// import { MapPin, Bed, Bath, Building, Layers, ArrowUpRight, IndianRupee,Home } from 'lucide-react'

// // Generate a consistent image URL based on property type using Picsum (more reliable)
// function getPropertyImage(propertyType, index) {
//   const seeds = {
//     'Multistorey Apartment': 1001,
//     'Builder Floor Apartment': 1002,
//     'Residential House': 1003,
//     'Villa': 1004,
//     'Studio Apartment': 1005,
//     'Penthouse': 1006,
//   }
//   const baseSeed = seeds[propertyType] || 1000
//   const seed = baseSeed + (index || 0)
//   return `https://picsum.photos/seed/${seed}/640/400`
// }

// function formatPrice(price) {
//   if (!price || price <= 0) return 'N/A'
//   if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
//   if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
//   if (price >= 1000) return `₹${(price / 1000).toFixed(1)} K`
//   return `₹${Math.round(price)}`
// }

// export default function HouseCard({ house, index, variant = 'carousel' }) {
//   const isCarousel = variant === 'carousel'

//   const city = house?.city || 'Unknown'
//   const locality = house?.locality && house.locality !== 'nan' && house.locality !== 'Missing' ? house.locality : ''
//   const propertyType = house?.propertyType || 'Property'
//   const bedrooms = house?.bedrooms || '-'
//   const bathrooms = house?.bathrooms || '-'
//   const furnishing = house?.furnishing || ''
//   const flrNum = house?.flrNum || ''
//   const totalFlrNum = house?.totalFlrNum || ''
//   const rentOrSale = house?.RentOrSale || ''
//   const predictedPrice = house?.predicted_price || 0
//   const url = house?.URLs || '#'

//   return (
//     <div
//       className={`glass-card overflow-hidden animate-fade-in ${isCarousel ? 'carousel-card' : ''}`}
//       style={{ animationDelay: `${(index || 0) * 0.08}s`, animationFillMode: 'both' }}
//     >
//       {/* Image */}
//       <div className="relative overflow-hidden" style={{ height: isCarousel ? '240px' : '280px' }}>
//           <img
//             src={getPropertyImage(propertyType, index)}
//             alt={`${propertyType} in ${city}`}
//             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//             loading="lazy"
//             onError={(e) => {
//               e.target.onerror = null
//               e.target.src = `https://placehold.co/640x400/1e293b/6366f1?text=${encodeURIComponent(propertyType)}`
//             }}
//           />
//           {/* Gradient overlay */}
//           <div className="absolute inset-0" style={{
//             background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)'
//           }}></div>

//           {/* Price badge */}
//           <div className="absolute bottom-4 left-4">
//             <span className="price-tag flex items-center gap-1 text-base px-4 py-2">
//               <IndianRupee size={16} />
//               {formatPrice(predictedPrice)}
//             </span>
//           </div>

//         {/* Rent/Sale circle badge */}
//         {rentOrSale && (
//           <div className="absolute top-3 right-3" style={{ zIndex: 10 }}>
//             <div
//               className="w-14 h-14 rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-wider shadow-lg"
//               style={{
//                 background: rentOrSale === 'Rent'
//                   ? 'linear-gradient(135deg, #ef4444, #dc2626)'
//                   : 'linear-gradient(135deg, #22c55e, #16a34a)',
//                 color: '#ffffff',
//                 border: '2px solid rgba(255,255,255,0.5)',
//                 boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
//                 lineHeight: 1.1,
//                 textAlign: 'center',
//                 paddingTop: '1px'
//               }}
//             >
//               {rentOrSale}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="px-6 pt-5 pb-6" style={{ background: '#ffffff', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem',padding:'1rem',gap:'1rem' }}>
//         {/* Property Type */}
//         <h3 className="font-semibold text-lg mb-1.5" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
//           {propertyType}
//         </h3>

//         {/* Location */}
//         <div className="flex items-center gap-1.5 mb-4 text-sm" style={{ color: '#6b7280' }}>
//           <MapPin size={14} className="flex-shrink-0" style={{color:'#c74444'}} />
//           <span className="truncate">{locality ? `${locality}, ` : ''}{city}</span>
//         </div>

//         {/* Features row */}
//         <div className="flex items-center gap-3 flex-wrap mb-4">
//           {bedrooms !== '-' && (
//             <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#6b7280' ,fontweight:'1000' }}>
//               <Bed size={14} style={{color:'#c74444'}}/> {bedrooms} BHK
//             </div>
//           )}
//           {bathrooms !== '-' && (
//             <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#6b7280' ,fontweight:'1000' }}>
//               <Bath size={14} style={{color:'#c74444'}}/> {bathrooms} Bath
//             </div>
//           )}
//           {furnishing && furnishing !== 'nan' && furnishing !== 'Missing' && (
//             <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#6b7280' ,fontweight:'1000' }}>
//               <Home size={14} style={{color:'#c74444'}}/> {furnishing}
//             </div>
//           )}
//         </div>

//         {/* Floor info */}
//         {(flrNum || totalFlrNum) && flrNum !== 'nan' && (
//           <div className="flex items-center gap-1.5 text-sm mb-4" style={{ color: '#9ca3af' }}>
//             <Layers size={14} className="flex-shrink-0" style={{color:'#c74444'}} />
//             {flrNum && flrNum !== 'nan' ? `Floor ${flrNum}` : ''}
//             {totalFlrNum && totalFlrNum !== 'nan' ? ` of ${totalFlrNum}` : ''}
//           </div>
//         )}

//         {/* View listing */}
//         {url && url !== '#' && url !== 'nan' && (
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-1.5 text-sm hover:underline font-medium transition-colors hover:text-red-700"
//             style={{ color: '#c74444'}}
//           >
//             View Original Listing <ArrowUpRight size={14} />
//           </a>
//         )}
//       </div>
//     </div>
//   )
// }



import React, { useState } from 'react'
import { MapPin, Bed, Bath, Home, Layers, ArrowUpRight, ExternalLink } from 'lucide-react'

const INR_TO_LKR = 3.65

function getPropertyImage(propertyType, index) {
  const seeds = {
    'Multistorey Apartment': 1001,
    'Builder Floor Apartment': 1002,
    'Residential House': 1003,
    'Villa': 1004,
    'Studio Apartment': 1005,
    'Penthouse': 1006,
  }
  const baseSeed = seeds[propertyType] || 1000
  const seed = baseSeed + (index || 0)
  return `https://picsum.photos/seed/${seed}/640/400`
}

function formatLKR(inrPrice) {
  if (!inrPrice || inrPrice <= 0) return 'N/A'
  const lkr = inrPrice * INR_TO_LKR
  if (lkr >= 1_000_000_00) return `Rs. ${(lkr / 1_000_000_00).toFixed(2)} Bn`
  if (lkr >= 1_000_000) return `Rs. ${(lkr / 1_000_000).toFixed(2)} Mn`
  if (lkr >= 1_000) return `Rs. ${(lkr / 1_000).toFixed(0)}K`
  return `Rs. ${Math.round(lkr).toLocaleString()}`
}

const TAG_STYLES = {
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.03em',
    background: '#f3f4f6',
    color: '#374151',
  }
}

export default function HouseCard({ house, index, variant = 'carousel', onClick }) {
  const [hovered, setHovered] = useState(false)
  const isCarousel = variant === 'carousel'

  const city = house?.city || 'Unknown'
  const locality = house?.locality && house.locality !== 'nan' && house.locality !== 'Missing' ? house.locality : ''
  const propertyType = house?.propertyType || 'Property'
  const bedrooms = house?.bedrooms || '-'
  const bathrooms = house?.bathrooms || '-'
  const furnishing = house?.furnishing || ''
  const flrNum = house?.flrNum || ''
  const totalFlrNum = house?.totalFlrNum || ''
  const rentOrSale = house?.RentOrSale || ''
  const predictedPrice = house?.predicted_price || 0
  const url = house?.URLs || '#'

  const isRent = rentOrSale === 'Rent'
  const badgeColor = isRent ? '#b91c1c' : '#15803d'
  const badgeBg = isRent ? '#fef2f2' : '#f0fdf4'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: isCarousel ? '350px' : '100%',
        minWidth: isCarousel ? '350px' : undefined,
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(220,38,38,0.10)'
          : '0 4px 24px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        border: '1px solid #f0f0f0',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        animationDelay: `${(index || 0) * 0.08}s`,
        animationFillMode: 'both',
        cursor: onClick ? 'pointer' : 'default',
      }}
      className="animate-fade-in"
    >
      <div style={{ position: 'relative', height: isCarousel ? '210px' : '260px', overflow: 'hidden' }}>
        <img
          src={getPropertyImage(propertyType, index)}
          alt={`${propertyType} in ${city}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            display: 'block',
          }}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/640x400/1e293b/ffffff?text=${encodeURIComponent(propertyType)}`
          }}
        />

        {/* Cinematic gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Rent / Sale pill — top-left */}
        {rentOrSale && (
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            padding: '4px 12px',
            borderRadius: '999px',
            background: badgeBg,
            color: badgeColor,
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${badgeColor}22`,
          }}>
            {isRent ? '🔑 For Rent' : '🏷️ For Sale'}
          </div>
        )}

        {/* Price — bottom overlay */}
        <div style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.65)', fontWeight: '500', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
              Predicted Price
            </p>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1, fontFamily: 'Outfit, sans-serif' }}>
              {formatLKR(predictedPrice)}
            </p>
          </div>

          {/* Floor badge — bottom-right */}
          {flrNum && flrNum !== 'nan' && (
            <div style={{
              padding: '4px 10px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.25)',
              fontSize: '11px',
              fontWeight: '600',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <Layers size={12} /> Floor {flrNum}{totalFlrNum && totalFlrNum !== 'nan' ? `/${totalFlrNum}` : ''}
            </div>
          )}
        </div>
      </div>

      {/* ── CONTENT BLOCK ── */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Property Type + Location */}
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{
            margin: '0 0 5px',
            fontSize: '16px',
            fontWeight: '700',
            color: '#111827',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {propertyType}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={12} style={{ color: '#dc2626', flexShrink: 0 }} />
            <span style={{
              fontSize: '12px',
              color: '#6b7280',
              fontWeight: '500',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {locality ? `${locality}, ` : ''}{city}
            </span>
          </div>
        </div>

        {/* Feature Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {bedrooms !== '-' && (
            <span style={TAG_STYLES.wrapper}>
              <Bed size={11} style={{ color: '#dc2626' }} />
              {bedrooms} BHK
            </span>
          )}
          {bathrooms !== '-' && (
            <span style={TAG_STYLES.wrapper}>
              <Bath size={11} style={{ color: '#dc2626' }} />
              {bathrooms} Bath
            </span>
          )}
          {furnishing && furnishing !== 'nan' && furnishing !== 'Missing' && (
            <span style={TAG_STYLES.wrapper}>
              <Home size={11} style={{ color: '#dc2626' }} />
              {furnishing}
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f3f4f6', marginBottom: '14px' }} />

        {/* CTA */}
        {/* CTA - Changed to open the Overview Modal */}
        <button
          onClick={(e) => {
            e.stopPropagation() // Prevents the card's main onClick from firing twice
            if (onClick) onClick()
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px 0',
            borderRadius: '12px',
            background: hovered ? 'linear-gradient(135deg, #dc2626, #ef4444)' : '#fef2f2',
            color: hovered ? '#ffffff' : '#dc2626',
            fontSize: '13px',
            fontWeight: '700',
            border: '1.5px solid #fecaca',
            width: '100%',
            cursor: 'pointer',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
        >
          Overview
        </button>
      </div>
    </div>
  )
}