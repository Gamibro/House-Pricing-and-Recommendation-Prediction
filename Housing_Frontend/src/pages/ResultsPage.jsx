import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader } from 'lucide-react'
import HouseCard from '../components/HouseCard'
import HouseDetailModal from '../components/HouseDetailModal'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedHouse, setSelectedHouse] = useState(null)

  const searchParams = location.state?.searchParams

  useEffect(() => {
    if (!searchParams) {
      navigate('/')
      return
    }

    fetchResults()
  }, [searchParams, navigate])

  const fetchResults = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      })

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
      }

      const data = await response.json()
      setResults(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'An error occurred while fetching results')
      console.error('Error fetching results:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-primary)' }}>
      <Header />
      
      {/* Main Content */}
      <main className="pt-32 pb-24 flex flex-col items-center">
        <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-10 px-5 py-3 rounded-lg transition-all hover:bg-opacity-80 font-medium"
            style={{
              background: '#fee2e2',
              border: '2px solid #fecaca',
              color: '#dc2626'
            }}
          >
            <ArrowLeft size={18} />
            Back to Search
          </button>

          {/* Results Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
              Recommended Properties
            </h1>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              {loading ? 'Loading recommendations...' : `Found ${results.length} matching properties with AI-predicted prices`}
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-12 p-6 rounded-lg" style={{
              background: '#fee2e2',
              border: '2px solid #fecaca',
              color: '#dc2626'
            }}>
              <p className="font-semibold">Error loading results: {error}</p>
              <button
                onClick={fetchResults}
                className="mt-2 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  color: '#dc2626'
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader size={40} className="animate-spin mb-4" style={{ color: '#dc2626' }} />
              <p style={{ color: '#6b7280' }}>Fetching AI recommendations...</p>
            </div>
          )}

          {/* Results Grid */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((house, index) => (
                <HouseCard
                  key={index}
                  house={house}
                  index={index}
                  variant="grid"
                  onClick={() => setSelectedHouse(house)}
                />
              ))}
            </div>
          )}

          {/* No Results State */}
          {!loading && results.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="glass-card p-8 max-w-md text-center">
                <p className="text-lg font-semibold mb-2" style={{ color: '#1f2937' }}>
                  No properties found
                </p>
                <p style={{ color: '#6b7280' }} className="mb-4">
                  Try adjusting your search criteria
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="btn-gradient"
                >
                  Modify Search
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

     {/* House Detail Modal */}
{selectedHouse && (
  <HouseDetailModal house={selectedHouse} onClose={() => setSelectedHouse(null)} />
)}
      <Footer />
    </div>
  )
}
