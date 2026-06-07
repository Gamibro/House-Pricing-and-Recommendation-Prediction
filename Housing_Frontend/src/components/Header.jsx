import React from 'react'
import { Home, TrendingUp, Building2, Menu, X, Calculator } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md" style={{
      background: '#ffffff',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '2px solid #fee2e2'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Link to Home */}
          <Link to="/" className="flex items-center gap-3 no-underline hover:opacity-75 transition-opacity">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              marginLeft: '20px',
            }}>
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
                HomeVista
              </h1>
              <p className="text-xs" style={{ color: '#f87171', marginTop: '-2px' }}>AI-Powered Housing</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-red-600 no-underline" style={{ color: '#374151' }}>
              <Home size={16} />
              Home
            </a>
            <Link to="/price-prediction" className="flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-red-600 no-underline" style={{ color: '#374151' }}>
              <Calculator size={16} />
              Predict Price
            </Link>
            <a href="#recommendations" className="flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-red-600 no-underline" style={{ color: '#374151' }}>
              <TrendingUp size={16} />
              Trending
            </a>
            <span className="w-px h-5 bg-gray-300"></span>
            <a href="#features" className="text-sm font-medium transition-colors duration-300 hover:text-red-600 no-underline" style={{ color: '#6b7280' }}>Features</a>
            <a href="#property" className="text-sm font-medium transition-colors duration-300 hover:text-red-600 no-underline" style={{ color: '#6b7280' }}>Property</a>
            <a href="#reviews" className="text-sm font-medium transition-colors duration-300 hover:text-red-600 no-underline" style={{ color: '#6b7280' }}>Success Stories</a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: '#374151' }}
            id="mobile-menu-btn"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4" style={{ background: '#f9fafb' }}>
          <a href="#home" className="block py-3 text-sm font-medium no-underline" style={{ color: '#374151' }} onClick={() => setMenuOpen(false)}>Home</a>
          <Link to="/price-prediction" className="block py-3 text-sm font-medium no-underline" style={{ color: '#374151' }} onClick={() => setMenuOpen(false)}>Predict Price</Link>
          <a href="#recommendations" className="block py-3 text-sm font-medium" style={{ color: '#374151' }} onClick={() => setMenuOpen(false)}>Trending</a>
          <div className="border-t border-gray-200 my-2"></div>
          <a href="#features" className="block py-2 text-sm font-medium" style={{ color: '#6b7280' }} onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#property" className="block py-2 text-sm font-medium" style={{ color: '#6b7280' }} onClick={() => setMenuOpen(false)}>Properties</a>
          <a href="#reviews" className="block py-2 text-sm font-medium" style={{ color: '#6b7280' }} onClick={() => setMenuOpen(false)}>Success Stories</a>
        </div>
      )}
    </header>
  )
}
