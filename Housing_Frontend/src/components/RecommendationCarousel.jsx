import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import HouseCard from './HouseCard'

export default function RecommendationCarousel({ houses, loading, onHouseClick }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Shimmer loading placeholders
  if (loading) {
    return (
      <section className="relative z-10 mt-16" id="recommendations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={24} style={{ color: '#dc2626' }} />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
                Curated Properties
              </h2>
              <p className="text-xs" style={{ color: '#6b7280' }}>Expert-selected homes with AI pricing</p>
            </div>
          </div>
          <div className="carousel-container">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="carousel-card">
                <div className="shimmer" style={{ height: '180px', borderRadius: '1rem 1rem 0 0' }}></div>
                <div className="p-4 space-y-3" style={{ background: '#ffffff', borderRadius: '0 0 1rem 1rem' }}>
                  <div className="shimmer" style={{ height: '20px', width: '70%' }}></div>
                  <div className="shimmer" style={{ height: '14px', width: '50%' }}></div>
                  <div className="flex gap-2">
                    <div className="shimmer" style={{ height: '24px', width: '60px' }}></div>
                    <div className="shimmer" style={{ height: '24px', width: '60px' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!houses || houses.length === 0) return null

  return (
    <section className="relative z-10 mt-16" id="recommendations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #dc2626, #ef4444)'
            }}>
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
                Featured Properties
              </h2>
              <p className="text-xs" style={{ color: '#6b7280' }}>AI-selected homes with accurate predictions</p>
            </div>
          </div>

          {/* Scroll buttons */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{ background: '#fee2e2', border: '2px solid #fecaca', color: '#dc2626' }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{ background: '#fee2e2', border: '2px solid #fecaca', color: '#dc2626' }}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={scrollRef} className="carousel-container">
          {houses.map((house, i) => (
            <HouseCard
              key={i}
              house={house}
              index={i}
              variant="carousel"
              onClick={onHouseClick ? () => onHouseClick(house) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
