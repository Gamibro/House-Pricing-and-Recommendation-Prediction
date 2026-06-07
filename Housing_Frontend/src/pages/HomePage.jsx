

// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AlertCircle } from 'lucide-react'
// import Header from '../components/Header'
// import SearchBar from '../components/SearchBar'
// import RecommendationCarousel from '../components/RecommendationCarousel'
// import Footer from '../components/Footer'

// export default function HomePage() {
//   const navigate = useNavigate()
//   const [filters, setFilters] = useState(null)
//   const [randomRecommendations, setRandomRecommendations] = useState([])
//   const [loadingFilters, setLoadingFilters] = useState(true)
//   const [loadingRecs, setLoadingRecs] = useState(true)
//   const [error, setError] = useState(null)

//   // Fetch filters on mount
//   useEffect(() => {
//     fetchFilters()
//     fetchRandomRecommendations()
//   }, [])

//   const fetchFilters = async () => {
//     try {
//       setLoadingFilters(true)
//       const response = await fetch('http://localhost:5000/api/filters')
//       if (!response.ok) throw new Error('Failed to fetch filters')
//       const data = await response.json()
//       setFilters(data)
//       setError(null)
//     } catch (err) {
//       console.error('Error fetching filters:', err)
//       setError('Unable to load filters. Please ensure the backend is running.')
//     } finally {
//       setLoadingFilters(false)
//     }
//   }

//   const fetchRandomRecommendations = async () => {
//     try {
//       setLoadingRecs(true)
//       const response = await fetch('http://localhost:5000/api/random-recommendations')
//       if (!response.ok) throw new Error('Failed to fetch recommendations')
//       const data = await response.json()
//       setRandomRecommendations(Array.isArray(data) ? data : [])
//     } catch (err) {
//       console.error('Error fetching random recommendations:', err)
//     } finally {
//       setLoadingRecs(false)
//     }
//   }

//   const handleSearch = (searchParams) => {
//     navigate('/results', { state: { searchParams } })
//   }

//   return (
//     <div className="min-h-screen" style={{ background: 'var(--gradient-primary)' }}>
//       <Header />

//       {/* Main Scrollable Content */}
//       <main className="relative z-10">
//         {/* Error Banner */}
//         {error && (
//           <div className="fixed top-20 left-0 right-0 z-40 flex justify-center px-6 sm:px-8 lg:px-10">
//             <div className="w-full max-w-7xl p-6 rounded-lg flex items-gap-3" style={{
//               background: '#fee2e2',
//               border: '2px solid #fecaca',
//               color: '#dc2626'
//             }}>
//               <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="font-semibold">Connection Error</p>
//                 <p className="text-sm">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Hero Section with Search Bar */}
//         <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12 relative overflow-hidden" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//           <div className="w-full max-w-7xl relative z-10">
//             <div className="mb-24 text-center">
//               <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Outfit, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
//                 Find Your Perfect Home
//               </h1>
//               <p className="text-lg sm:text-xl mb-12 text-white opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
//                 Powered by AI-driven insights and real-time market data
//               </p>
//             </div>
//             <SearchBar
//               onSearch={handleSearch}
//               filters={filters}
//               loading={loadingFilters}
//             />
//           </div>
//         </section>

// {/* Why Choose HomeVista Section - With Branch Lines */}
// <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12 relative" style={{ background: '#ffffff' }}>
//   <div className="w-full max-w-7xl">
//     {/* Centered Title */}
//     <div className="text-center mb-30">
//       <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
//         Why Choose HomeVista?
//       </h2>
//       <p className="text-lg" style={{ color: '#6b7280' }}>
//         Experience the future of property discovery with cutting-edge technology
//       </p>
//     </div>

//     {/* Branch Container */}
//     <div className="relative">
//       {/* Vertical Line from Center */}
//       <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-red-500 via-red-600 to-red-500 rounded-full" style={{ 
//         height: '100%', 
//         boxShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
//         zIndex: 10
//       }}></div>

//       {/* Cards with increased gap */}
//       <div className="space-y-24">
//         {/* Card 1 - Left Side */}
//         <div className="relative">
//           {/* Short horizontal branch line from dot to nearest card edge (left side) */}
//           <div className="absolute top-1/2 transform -translate-y-1/2 hidden lg:block" style={{ 
//             width: '2.5rem',
//             height: '3px',
//             background: 'linear-gradient(90deg, #dc2626, #ef4444)',
//             right: 'auto',
//             left: 'calc(50% - 2.5rem)',
//             boxShadow: '0 0 6px rgba(220, 38, 38, 0.5)',
//             zIndex: 10
//           }}></div>

//           {/* Dot at connection point on vertical line */}
//           <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full hidden lg:block" style={{
//             boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)',
//             zIndex: 20
//           }}></div>

//           <div className="flex justify-start">
//             <div className="w-full lg:w-5/12">
//               <div className="glass-card hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-400" style={{ 
//                 borderRadius: '1.5rem',
//                 padding: '2rem'
//               }}>
//                 <div className="flex items-center gap-6">
//                   <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{
//                     background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
//                   }}>
//                     <span className="text-4xl">🤖</span>
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-semibold mb-2" style={{ color: '#1f2937' }}>
//                       AI-Powered Predictions
//                     </h3>
//                     <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
//                       Advanced machine learning algorithms predict accurate property prices with up to 95% precision
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Card 2 - Right Side */}
//         <div className="relative">
//           {/* Short horizontal branch line from dot to nearest card edge (right side) */}
//           <div className="absolute top-1/2 transform -translate-y-1/2 hidden lg:block" style={{ 
//             width: '2.5rem',
//             height: '3px',
//             background: 'linear-gradient(270deg, #dc2626, #ef4444)',
//             left: 'auto',
//             right: 'calc(50% - 2.5rem)',
//             boxShadow: '0 0 6px rgba(220, 38, 38, 0.5)',
//             zIndex: 10
//           }}></div>

//           {/* Dot at connection point on vertical line */}
//           <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full hidden lg:block" style={{
//             boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)',
//             zIndex: 20
//           }}></div>

//           <div className="flex justify-end">
//             <div className="w-full lg:w-5/12">
//               <div className="glass-card hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-400" style={{ 
//                 borderRadius: '1.5rem',
//                 padding: '2rem'
//               }}>
//                 <div className="flex items-center gap-6">
//                   <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{
//                     background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
//                   }}>
//                     <span className="text-4xl">🎯</span>
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-semibold mb-2" style={{ color: '#1f2937' }}>
//                       Smart Recommendations
//                     </h3>
//                     <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
//                       Get personalized property suggestions based on your preferences and budget requirements
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Card 3 - Left Side */}
//         <div className="relative">
//           {/* Short horizontal branch line from dot to nearest card edge (left side) */}
//           <div className="absolute top-1/2 transform -translate-y-1/2 hidden lg:block" style={{ 
//             width: '2.5rem',
//             height: '3px',
//             background: 'linear-gradient(90deg, #dc2626, #ef4444)',
//             right: 'auto',
//             left: 'calc(50% - 2.5rem)',
//             boxShadow: '0 0 6px rgba(220, 38, 38, 0.5)',
//             zIndex: 10
//           }}></div>

//           {/* Dot at connection point on vertical line */}
//           <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full hidden lg:block" style={{
//             boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)',
//             zIndex: 20
//           }}></div>

//           <div className="flex justify-start">
//             <div className="w-full lg:w-5/12">
//               <div className="glass-card hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-400" style={{ 
//                 borderRadius: '1.5rem',
//                 padding: '2rem'
//               }}>
//                 <div className="flex items-center gap-6">
//                   <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{
//                     background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
//                   }}>
//                     <span className="text-4xl">📊</span>
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-semibold mb-2" style={{ color: '#1f2937' }}>
//                       Real-Time Data
//                     </h3>
//                     <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
//                       Access up-to-date property listings and comprehensive market insights instantly
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//         {/* Featured Recommendations Section - Enhanced Cards */}
//         <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12" style={{ background: 'var(--gradient-primary)' }}>
//           <div className="w-full max-w-7xl">
//             <div className="text-center mb-24">
//               <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
//                 Curated Property Collection
//               </h2>
//               <p className="text-lg" style={{ color: '#6b7280' }}>
//                 Discover AI-selected properties with accurate price predictions
//               </p>
//             </div>
//             <div style={{ '--carousel-gap': '2rem' }}>
//               <RecommendationCarousel houses={randomRecommendations} loading={loadingRecs} />
//             </div>
//           </div>
//         </section>

//        {/* How It Works Section - Horizontal Branch Design */}
// <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12" style={{ background: '#ffffff' }}>
//   <div className="w-full max-w-7xl">
//     <div className="text-center mb-24">
//       <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
//         How It Works
//       </h2>
//       <p className="text-lg" style={{ color: '#6b7280' }}>
//         Your journey to finding the perfect property in four simple steps
//       </p>
//     </div>

//     {/* Horizontal Branch Container */}
//     <div className="relative">
//       {/* Main horizontal branch line */}
//       <div className="hidden lg:block absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px" 
//            style={{ background: 'linear-gradient(90deg, transparent 0%, #dc2626 15%, #dc2626 85%, transparent 100%)' }}>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {[
//           { num: '1', title: 'Search', desc: 'Enter your preferences and desired location', icon: '🔍' },
//           { num: '2', title: 'Filter', desc: 'Refine results by price, size, and amenities', icon: '⚙️' },
//           { num: '3', title: 'Analyze', desc: 'Get AI-powered price predictions and insights', icon: '📊' },
//           { num: '4', title: 'Decide', desc: 'Make informed decisions with confidence', icon: '✅' }
//         ].map((step, idx) => (
//           <div key={idx} className="group relative">
//             {/* Branch connector dots and lines */}
//             {idx < 3 && (
//               <>
//                 {/* Horizontal connector line */}
//                 <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 {/* Small dot on branch */}
//                 <div className="hidden lg:block absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </>
//             )}

//             {/* Branch node dot above card */}
//             <div className="hidden lg:block absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//             <div className="glass-card p-8 text-center transition-all duration-300 hover:shadow-2xl" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

//               {/* Icon with red gradient background */}
//               <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 group-hover:scale-105" style={{
//                 background: 'linear-gradient(135deg, #dc2626, #ef4444)',
//                 color: '#ffffff'
//               }}>
//                 <span className="text-3xl">{step.icon}</span>
//               </div>

//               {/* Step number - red circle with white text */}
//               <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{
//                 background: '#dc2626',
//                 boxShadow: '0 2px 8px rgba(220,38,38,0.3)'
//               }}>
//                 <span className="text-xl font-bold text-white">{step.num}</span>
//               </div>

//               <h3 className="text-2xl font-semibold mb-3" style={{ color: '#1f2937' }}>
//                 {step.title}
//               </h3>
//               <p className="text-lg" style={{ color: '#6b7280' }}>
//                 {step.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// </section>
//         {/* Statistics Section */}
//         <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
//           <div className="w-full max-w-7xl">
//             <div className="text-center mb-24">
//               <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
//                 Trusted by Thousands
//               </h2>
//               <p className="text-lg text-white opacity-90">
//                 Join our growing community of smart property seekers
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//               {[
//                 { stat: '50K+', label: 'Properties Listed' },
//                 { stat: '95%', label: 'Prediction Accuracy' },
//                 { stat: '10K+', label: 'Happy Customers' }
//               ].map((item, idx) => (
//                 <div key={idx} className="text-center p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)' }}>
//                   <div className="text-5xl sm:text-6xl font-bold text-white mb-4">
//                     {item.stat}
//                   </div>
//                   <p className="text-lg text-white opacity-90">
//                     {item.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section with Animated Background */}
//         <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12 relative overflow-hidden" style={{ background: '#ffffff' }}>
//           <style>{`
//             @keyframes scrollBg {
//               0% { background-position: 0 0; }
//               100% { background-position: 2000px 0; }
//             }
//             .cta-animated-bg {
//               animation: scrollBg 20s linear infinite;
//             }
//           `}</style>
//           <div className="absolute inset-0 cta-animated-bg" style={{
//             backgroundImage: 'url("https://source.unsplash.com/800x600/?luxury,home")',
//             backgroundSize: '400px 300px',
//             backgroundRepeat: 'repeat-x',
//             backgroundPosition: '0 0',
//             opacity: 0.3
//           }}></div>
//           <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.85) 100%)' }}></div>
//           <div className="w-full max-w-7xl text-center relative z-10">
//             <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
//               Ready to Find Your Dream Home?
//             </h2>
//             <p className="text-lg mb-12" style={{ color: '#6b7280' }}>
//               Start your property search today with AI-powered recommendations
//             </p>
//             <button
//               onClick={() => {
//                 const searchBarElement = document.querySelector('[id="search-bar"]')
//                 searchBarElement?.scrollIntoView({ behavior: 'smooth' })
//               }}
//               className="px-16 py-5 rounded-xl text-xl font-semibold transition-all hover:shadow-2xl transform hover:scale-105"
//               style={{
//                 background: 'linear-gradient(135deg, #dc2626, #ef4444)',
//                 color: '#ffffff',
//                 border: 'none'
//               }}
//             >
//               Start Searching Now
//             </button>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Star } from 'lucide-react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import RecommendationCarousel from '../components/RecommendationCarousel'
import HouseDetailModal from '../components/HouseDetailModal'
import Footer from '../components/Footer'

export default function HomePage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(null)
  const [randomRecommendations, setRandomRecommendations] = useState([])
  const [loadingFilters, setLoadingFilters] = useState(true)
  const [loadingRecs, setLoadingRecs] = useState(true)
  const [error, setError] = useState(null)
  const [selectedHouse, setSelectedHouse] = useState(null)

  // Reviews data (same as before)
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Austin, TX",
      rating: 5,
      title: "Spot-on Price Prediction!",
      comment: "The AI prediction was within 2% of the final sale price. This tool gave me the confidence to make a competitive offer.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "San Francisco, CA",
      rating: 5,
      title: "Found my dream home in 3 days",
      comment: "Recommendations were incredibly accurate based on my preferences. Saved hours of manual searching through listings.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, FL",
      rating: 4,
      title: "Game changer for home buying",
      comment: "The smart filtering and price predictions helped me stay within budget. Found a great property in a competitive market.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Kim",
      location: "Seattle, WA",
      rating: 5,
      title: "Accurate and timely insights",
      comment: "Real-time data made all the difference. I got alerts before properties hit other platforms and secured a great deal.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      date: "2 months ago"
    },
    {
      id: 5,
      name: "Jessica Williams",
      location: "Denver, CO",
      rating: 5,
      title: "Best property search experience",
      comment: "The AI recommendations understood exactly what I was looking for. Felt like having a personal real estate analyst.",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Robert Taylor",
      location: "Chicago, IL",
      rating: 4,
      title: "Reliable predictions",
      comment: "Compared three different platforms, and HomeVista had the most accurate price predictions. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      date: "3 months ago"
    },
    {
      id: 7,
      name: "Amanda Lee",
      location: "Portland, OR",
      rating: 5,
      title: "Made first-time buying stress-free",
      comment: "As a first-time buyer, the insights and recommendations were invaluable. Closed on my perfect starter home!",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg",
      date: "1 month ago"
    },
    {
      id: 8,
      name: "James Wilson",
      location: "Nashville, TN",
      rating: 5,
      title: "Investment insights worth every minute",
      comment: "Used the platform for an investment property. The market analysis and predictions helped me identify a gem with great ROI potential.",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      date: "2 weeks ago"
    }
  ]

  useEffect(() => {
    fetchFilters()
    fetchRandomRecommendations()
  }, [])

  const fetchFilters = async () => {
    try {
      setLoadingFilters(true)
      const response = await fetch('http://localhost:5000/api/filters')
      if (!response.ok) throw new Error('Failed to fetch filters')
      const data = await response.json()
      setFilters(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching filters:', err)
      setError('Unable to load filters. Please ensure the backend is running.')
    } finally {
      setLoadingFilters(false)
    }
  }

  const fetchRandomRecommendations = async () => {
    try {
      setLoadingRecs(true)
      const response = await fetch('http://localhost:5000/api/random-recommendations')
      if (!response.ok) throw new Error('Failed to fetch recommendations')
      const data = await response.json()
      setRandomRecommendations(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching random recommendations:', err)
    } finally {
      setLoadingRecs(false)
    }
  }

  const handleSearch = (searchParams) => {
    navigate('/results', { state: { searchParams } })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-current text-yellow-400" : "text-gray-300"}
      />
    ))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-primary)' }}>
      <Header />

      <main className="relative z-10">
        {/* Error Banner - unchanged */}
        {error && (
          <div className="fixed top-20 left-0 right-0 z-40 flex justify-center px-6 sm:px-8 lg:px-10">
            <div className="w-full max-w-7xl p-6 rounded-lg flex items-gap-3" style={{
              background: '#fee2e2',
              border: '2px solid #fecaca',
              color: '#dc2626'
            }}>
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Connection Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section - unchanged */}
        <section id="home" className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12 relative overflow-hidden" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="w-full max-w-7xl relative z-10">
            <div className="mb-24 text-center">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Outfit, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Find Your Perfect Home
              </h1>
              <p className="text-lg sm:text-xl mb-12 text-white opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                Powered by AI-driven insights and real-time market data
              </p>
            </div>
            <SearchBar onSearch={handleSearch} filters={filters} loading={loadingFilters} />
          </div>
        </section>

        {/* Why Choose HomeVista - unchanged */}
        <section id="features" className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12 relative" style={{ background: '#ffffff', borderBottom: '1px solid #d1d5db' }}>
          <div className="w-full max-w-7xl">    {/* Centered Title */}    <div className="text-center mb-30">
            <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
              Why Choose HomeVista?
            </h2>
            <p className="text-lg" style={{ color: '#6b7280' }}>
              Experience the future of property discovery with cutting-edge technology
            </p>
          </div>

            {/* Branch Container */}
            <div className="relative">
              {/* Vertical Line from Center */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-red-500 via-red-600 to-red-500 rounded-full" style={{
                height: '100%',
                boxShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
                zIndex: 10
              }}></div>

              {/* Cards with increased gap */}
              <div className="space-y-24">
                {/* Card 1 - Left Side */}
                <div className="relative">
                  {/* Short horizontal branch line from dot to nearest card edge (left side) */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 hidden lg:block" style={{
                    width: '2.5rem',
                    height: '3px',
                    background: 'linear-gradient(90deg, #dc2626, #ef4444)',
                    right: 'auto',
                    left: 'calc(50% - 2.5rem)',
                    boxShadow: '0 0 6px rgba(220, 38, 38, 0.5)',
                    zIndex: 10
                  }}></div>

                  {/* Dot at connection point on vertical line */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full hidden lg:block" style={{
                    boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)',
                    zIndex: 20
                  }}></div>

                  <div className="flex justify-start">
                    <div className="w-full lg:w-5/12">
                      <div className="glass-card hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-400" style={{
                        borderRadius: '1.5rem',
                        padding: '2rem'
                      }}>
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{
                            background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                          }}>
                            <span className="text-4xl">🤖</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold mb-2" style={{ color: '#1f2937' }}>
                              AI-Powered Predictions
                            </h3>
                            <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                              Advanced machine learning algorithms predict accurate property prices with up to 95% precision
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Right Side */}
                <div className="relative">
                  {/* Short horizontal branch line from dot to nearest card edge (right side) */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 hidden lg:block" style={{
                    width: '2.5rem',
                    height: '3px',
                    background: 'linear-gradient(270deg, #dc2626, #ef4444)',
                    left: 'auto',
                    right: 'calc(50% - 2.5rem)',
                    boxShadow: '0 0 6px rgba(220, 38, 38, 0.5)',
                    zIndex: 10
                  }}></div>

                  {/* Dot at connection point on vertical line */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full hidden lg:block" style={{
                    boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)',
                    zIndex: 20
                  }}></div>

                  <div className="flex justify-end">
                    <div className="w-full lg:w-5/12">
                      <div className="glass-card hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-400" style={{
                        borderRadius: '1.5rem',
                        padding: '2rem'
                      }}>
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{
                            background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                          }}>
                            <span className="text-4xl">🎯</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold mb-2" style={{ color: '#1f2937' }}>
                              Smart Recommendations
                            </h3>
                            <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                              Get personalized property suggestions based on your preferences and budget requirements
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Left Side */}
                <div className="relative">
                  {/* Short horizontal branch line from dot to nearest card edge (left side) */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 hidden lg:block" style={{
                    width: '2.5rem',
                    height: '3px',
                    background: 'linear-gradient(90deg, #dc2626, #ef4444)',
                    right: 'auto',
                    left: 'calc(50% - 2.5rem)',
                    boxShadow: '0 0 6px rgba(220, 38, 38, 0.5)',
                    zIndex: 10
                  }}></div>

                  {/* Dot at connection point on vertical line */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full hidden lg:block" style={{
                    boxShadow: '0 0 8px rgba(220, 38, 38, 0.8)',
                    zIndex: 20
                  }}></div>

                  <div className="flex justify-start">
                    <div className="w-full lg:w-5/12">
                      <div className="glass-card hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-400" style={{
                        borderRadius: '1.5rem',
                        padding: '2rem'
                      }}>
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{
                            background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                          }}>
                            <span className="text-4xl">📊</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold mb-2" style={{ color: '#1f2937' }}>
                              Real-Time Data
                            </h3>
                            <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                              Access up-to-date property listings and comprehensive market insights instantly
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Recommendations - unchanged */}
        <section id="property" className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12" style={{ background: 'var(--gradient-primary)', borderBottom: '1px solid #d1d5db' }}>
          <div className="w-full max-w-7xl">
            <div className="text-center mb-24">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
                Curated Property Collection
              </h2>
              <p className="text-lg" style={{ color: '#6b7280' }}>
                Discover AI-selected properties with accurate price predictions
              </p>
            </div>
            <div style={{ '--carousel-gap': '2rem' }}>
              <RecommendationCarousel
                houses={randomRecommendations}
                loading={loadingRecs}
                onHouseClick={setSelectedHouse}
              />
            </div>
          </div>
        </section>

        {/* ========== CUSTOMER REVIEWS GRID SECTION (CENTERED, NO RED HEADER) ========== */}
        <section id="reviews" className="w-full min-h-screen flex items-center justify-center pt-20 pb-76 px-4 sm:px-6 lg:px-12" style={{ background: '#f9fafb' }}>
          <div className="max-w-7xl mx-auto w-full">
            {/* Section Header - Centered */}
            <div className="text-center mb-24">
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                  <span>⭐</span> Customer Testimonials
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
                What Customers Love
              </h2>
              <p className="text-lg mb-12 text-black-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                Real stories from happy homebuyers who found their dream properties using HomeVista
              </p>
            </div>

            {/* Reviews Grid - Fully Centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" >
                {reviews.slice(0, 6).map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full"
                    style={{ padding: '1rem' }}
                  >
                    {/* Card Body with Avatar at the top (no red background) */}
                    <div className="bg-white flex flex-col items-center text-center">
                      {/* Avatar - now with gap from top and text */}
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md mb-4"
                      />

                      {/* Rating Stars */}
                      <div className="flex justify-center gap-1 mb-3">
                        {renderStars(review.rating)}
                      </div>

                      {/* Review Title */}
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        {review.title}
                      </h3>

                      {/* Review Comment */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-4">
                        "{review.comment}"
                      </p>

                      {/* Divider */}
                      <div className="border-t border-gray-200 my-4 w-full"></div>

                      {/* Customer Info */}
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {review.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {review.location} • {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </section>

        {/* Statistics Section - unchanged */}
        <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
          <div className="w-full max-w-7xl">
            <div className="text-center mb-24">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Trusted by Thousands
              </h2>
              <p className="text-lg text-white opacity-90">
                Join our growing community of smart property seekers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { stat: '50K+', label: 'Properties Listed' },
                { stat: '95%', label: 'Prediction Accuracy' },
                { stat: '10K+', label: 'Happy Customers' }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)' }}>
                  <div className="text-5xl sm:text-6xl font-bold text-white mb-4">
                    {item.stat}
                  </div>
                  <p className="text-lg text-white opacity-90">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - unchanged */}
        <section className="w-full min-h-screen flex items-center justify-center pt-56 pb-40 px-8 sm:px-10 lg:px-12 relative overflow-hidden" style={{ background: '#ffffff' }}>
          <style>
            {`
              @keyframes slideBackgrounds {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .bg-slider {
                animation: slideBackgrounds 30s linear infinite;
                width: 200%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
              }
              .bg-slide {
                width: 50%;
                height: 100%;
                background-size: cover;
                background-position: center;
              }
            `}
          </style>
          <div className="absolute inset-0 overflow-hidden">
            <div className="bg-slider">
              <div className="bg-slide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop")' }}></div>
              <div className="bg-slide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop")' }}></div>
              <div className="bg-slide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&h=1080&fit=crop")' }}></div>
              <div className="bg-slide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=1080&fit=crop")' }}></div>
            </div>
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)' }}></div>
          <div className="w-full max-w-7xl text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Outfit, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-lg mb-12 text-white opacity-90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
              Start your property search today with AI-powered recommendations
            </p>
            <button
              onClick={() => {
                // Target the Hero section by its ID
                const heroSection = document.getElementById('home');
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-46 py-2 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-lg cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                color: '#ffffff',
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                letterSpacing: '1.5px',
                padding: ' 0.5rem',
                marginTop: '0.75rem'
              }}
              onMouseEnter={(e) => { e.target.style.boxShadow = '0 12px 35px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)'; e.target.style.background = 'linear-gradient(135deg, #ef4444, #f87171)' }}
              onMouseLeave={(e) => { e.target.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'; e.target.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)' }}
            >
              Start Searching Now
            </button>
          </div>
        </section>
      </main>

      {/* After - Wrap it in a conditional statement */}
      {selectedHouse && (
        <HouseDetailModal house={selectedHouse} onClose={() => setSelectedHouse(null)} />
      )}

      <Footer />
    </div>
  )
}