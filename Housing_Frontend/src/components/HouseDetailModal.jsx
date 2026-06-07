import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin, Bed, Bath, Home, Layers, ArrowUpRight } from 'lucide-react'

const INR_TO_LKR = 3.65

function formatINR(price) {
  if (!price || price <= 0) return 'N/A'
  return `₹${Math.round(price).toLocaleString('en-IN')}`
}

function formatLKR(price) {
  if (!price || price <= 0) return 'N/A'
  return `Rs. ${Math.round(price * INR_TO_LKR).toLocaleString('en-LK')}`
}

function getPropertyImages(propertyType, index) {
  const seeds = {
    'Multistorey Apartment': [1001, 1002, 1003, 1004],
    'Builder Floor Apartment': [1002, 1003, 1004, 1005],
    'Residential House': [1003, 1004, 1005, 1006],
    'Villa': [1004, 1005, 1006, 1007],
    'Studio Apartment': [1005, 1006, 1007, 1008],
    'Penthouse': [1006, 1007, 1008, 1009],
  }
  const baseSeeds = seeds[propertyType] || [1000, 1001, 1002, 1003]
  const offset = index || 0
  return baseSeeds.map((seed) => `https://picsum.photos/seed/${seed + offset}/800/500`)
}

const KEY_AMENITIES = [
  { key: 'Swimming_Pool', label: 'Swimming Pool', icon: '🏊' },
  { key: 'Gymnasium', label: 'Gym', icon: '💪' },
  { key: 'Security', label: 'Security', icon: '🛡️' },
  { key: 'Lift', label: 'Lift', icon: '🛗' },
  { key: 'Park', label: 'Park', icon: '🌳' },
  { key: 'Power_Back_Up', label: 'Power Backup', icon: '⚡' },
  { key: 'Reserved_Parking', label: 'Reserved Parking', icon: '🚗' },
  { key: 'Kids_Play_Area', label: 'Kids Play Area', icon: '🛝' },
  { key: 'Kids_Play_Pool_With_Water_Slides', label: 'Kids Water Pool', icon: '🌊' },
  { key: 'Club_House', label: 'Club House', icon: '🏛️' },
  { key: 'Cafeteria_Or_Food_Court', label: 'Food Court', icon: '🍽️' },
  { key: 'Private_Terrace_Or_Garden', label: 'Terrace/Garden', icon: '🌿' },
  { key: 'Jogging_and_Strolling_Track', label: 'Jogging Track', icon: '🏃' },
]

export default function HouseDetailModal({ house, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!house) return null

  const images = getPropertyImages(house.propertyType, house.index)
  const isRent = house.RentOrSale === 'Rent'
  const availableAmenities = KEY_AMENITIES.filter(
    (amenity) => house[amenity.key] === 1 || house[amenity.key] === true
  )
  const securityDeposit = house.securityDeposit || 0
  const maintenanceCharges = house.maintenanceCharges || 0
  const brokerage = house.brokerage || 0
  const carpetArea = house.carpetArea || house.carpetArea || 0
  const balconies = house.balconies || 0
  const flrNum = house.flrNum || ''
  const totalFlrNum = house.totalFlrNum || ''

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: '24px',
          background: '#ffffff',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 28px',
            borderBottom: '1px solid #f3f4f6',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: '700',
              color: '#111827',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {house.propertyType || 'Property'}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: '#f3f4f6',
              color: '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Split Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '0',
          }}
        >
          {/* Image Carousel - Left (40%) */}
          <div
            style={{
              flex: '0 0 40%',
              minWidth: '300px',
              position: 'relative',
              padding: '28px',
              paddingRight: '14px',
            }}
          >
            {/* Feature Image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '280px',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${house.propertyType} - Image ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `https://placehold.co/800x500/1e293b/ffffff?text=${encodeURIComponent(house.propertyType)}`
                }}
              />

              {/* Rent/Sale Badge */}
              {house.RentOrSale && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: isRent ? '#fef2f2' : '#f0fdf4',
                    color: isRent ? '#b91c1c' : '#15803d',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${isRent ? '#fecaca' : '#bbf7d0'}`,
                  }}
                >
                  {isRent ? '🔑 For Rent' : '🏷️ For Sale'}
                </div>
              )}

              {/* Image Carousel Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Image Dots */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          border: 'none',
                          background: idx === currentImageIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Details Section - Right (60%) */}
          <div
            style={{
              flex: '0 0 60%',
              minWidth: '300px',
              padding: '28px',
              paddingLeft: '14px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <p
                style={{
                  margin: '0 0 6px',
                  fontSize: '13px',
                  color: '#6b7280',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Predicted Price
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#111827',
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                {formatINR(house.predicted_price)} INR
              </p>
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '18px',
                  color: '#dc2626',
                  fontWeight: '600',
                }}
              >
                {formatLKR(house.predicted_price)} LKR
              </p>
            </div>

            {/* Feature Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {house.bedrooms && house.bedrooms !== '-' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: '#f3f4f6',
                    color: '#374151',
                  }}
                >
                  <Bed size={14} style={{ color: '#dc2626' }} />
                  {house.bedrooms} BHK
                </span>
              )}
              {house.bathrooms && house.bathrooms !== '-' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: '#f3f4f6',
                    color: '#374151',
                  }}
                >
                  <Bath size={14} style={{ color: '#dc2626' }} />
                  {house.bathrooms} Bath
                </span>
              )}
              {house.furnishing && house.furnishing !== 'nan' && house.furnishing !== 'Missing' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: '#f3f4f6',
                    color: '#374151',
                  }}
                >
                  <Home size={14} style={{ color: '#dc2626' }} />
                  {house.furnishing}
                </span>
              )}
            </div>

            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              <MapPin size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
              <span
                style={{
                  fontSize: '15px',
                  color: '#4b5563',
                  fontWeight: '500',
                }}
              >
                {house.locality ? `${house.locality}, ` : ''}{house.city || 'Unknown'}
              </span>
            </div>

            {/* Floor Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '16px',
              }}
            >
              <Layers size={16} style={{ color: '#6b7280' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {flrNum && flrNum !== 'nan' ? `Floor ${flrNum}` : ''}{' '}
                {totalFlrNum && totalFlrNum !== 'nan'
                  ? flrNum ? `of ${totalFlrNum}` : ''
                  : ''}
                {balconies ? ` • Balconies: ${balconies}` : ''}
              </span>
            </div>

            {/* Additional Costs */}
            <div style={{ marginBottom: '20px' }}>
              <p
                style={{
                  margin: '0 0 12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                }}
              >
                Additional Costs
              </p>
              {securityDeposit > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Security Deposit</span>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
                    {formatINR(securityDeposit)} / {formatLKR(securityDeposit)}
                  </span>
                </div>
              )}
              {maintenanceCharges > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Monthly Maintenance</span>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
                    {formatINR(maintenanceCharges)} / {formatLKR(maintenanceCharges)}
                  </span>
                </div>
              )}
              {brokerage > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Brokerage</span>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
                    {formatINR(brokerage)} / {formatLKR(brokerage)}
                  </span>
                </div>
              )}
              {carpetArea && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Carpet Area</span>
                  <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
                    {carpetArea} sq.ft
                  </span>
                </div>
              )}
            </div>

            {/* Facing & Posted */}
            {house.facing && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#6b7280' }}>
                  Facing: <span style={{ color: '#111827', fontWeight: '500' }}>{house.facing}</span>
                </p>
                {house.postedOn_DaysAgo && (
                  <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                    Posted: <span style={{ color: '#111827', fontWeight: '500' }}>{house.postedOn_DaysAgo} days ago</span>
                  </p>
                )}
              </div>
            )}

            {/* Amenities */}
            {availableAmenities.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <p
                  style={{
                    margin: '0 0 12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                  }}
                >
                  Amenities
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {availableAmenities.map((amenity) => (
                    <span
                      key={amenity.key}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: '#fef2f2',
                        color: '#dc2626',
                      }}
                    >
                      <span>{amenity.icon}</span>
                      {amenity.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {house.URLs && house.URLs !== '#' && house.URLs !== 'nan' && (
              <a
                href={house.URLs}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: hovered
                    ? 'linear-gradient(135deg, #dc2626, #ef4444)'
                    : '#fef2f2',
                  color: hovered ? '#ffffff' : '#dc2626',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '1.5px solid #fecaca',
                  transition: 'all 0.25s ease',
                  marginTop: 'auto',
                }}
              >
                View Original Listing <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}