// import React, { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { Calculator, MapPin, Home, Bed, Bath, Building, Layers, ArrowUpDown, Tag, Calendar, ChevronLeft, Loader2 } from 'lucide-react'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

// const INR_TO_LKR_RATE = 0.46 // Approximate rate: 1 INR = 0.46 LKR

// const formatCurrency = (amount, currency = 'INR') => {
//   if (amount === null || amount === undefined || isNaN(amount)) return 'N/A'

//   const formatted = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: currency === 'LKR' ? 'LKR' : 'INR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0
//   }).format(amount)
//   return formatted
// }

// const calculateDaysAgo = (dateString) => {
//   if (!dateString) return 1
//   const postedDate = new Date(dateString)
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)
//   postedDate.setHours(0, 0, 0, 0)
//   const diffTime = today - postedDate
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//   return Math.max(1, diffDays)
// }

// export default function PricePredictionPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [filters, setFilters] = useState(null)
//   const [loadingFilters, setLoadingFilters] = useState(true)
//   const [localities, setLocalities] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [prediction, setPrediction] = useState(null)
//   const [error, setError] = useState(null)
//   const [formData, setFormData] = useState({
//     city: '',
//     locality: '',
//     propertyType: '',
//     furnishing: '',
//     RentOrSale: '',
//     bedrooms: '',
//     bathrooms: '',
//     flrNum: '',
//     totalFlrNum: '',
//     postedOn: new Date().toISOString().split('T')[0]
//   })

//   useEffect(() => {
//     fetchFilters()
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

//   useEffect(() => {
//     if (filters && formData.city && filters.localitiesByCity) {
//       const cityLocalities = filters.localitiesByCity[formData.city] || []
//       setLocalities(cityLocalities)
//       setFormData(prev => ({ ...prev, locality: '' }))
//     } else {
//       setLocalities([])
//     }
//   }, [formData.city, filters])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value
//     const today = new Date().toISOString().split('T')[0]

//     if (selectedDate > today) {
//       return
//     }

//     setFormData(prev => ({ ...prev, postedOn: selectedDate }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setPrediction(null)

//     try {
//       const postedOn_DaysAgo = calculateDaysAgo(formData.postedOn)

//       const response = await fetch('http://localhost:5000/api/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           city: formData.city,
//           locality: formData.locality,
//           propertyType: formData.propertyType,
//           furnishing: formData.furnishing,
//           RentOrSale: formData.RentOrSale,
//           bedrooms: parseInt(formData.bedrooms) || 2,
//           bathrooms: parseInt(formData.bathrooms) || 2,
//           flrNum: formData.flrNum,
//           totalFlrNum: parseInt(formData.totalFlrNum) || 5,
//           postedOn_DaysAgo: postedOn_DaysAgo
//         })
//       })

//       if (!response.ok) throw new Error('Failed to get prediction')
//       const data = await response.json()

//       if (data.error) throw new Error(data.error)

//       setPrediction({
//         inr: data.predicted_price,
//         lkr: data.predicted_price * INR_TO_LKR_RATE
//       })
//     } catch (err) {
//       console.error('Error predicting price:', err)
//       setError(err.message || 'Failed to get price prediction')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleBack = () => {
//     navigate('/')
//   }

//   const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"

//   return (
//     <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%)' }}>
//       <Header />

//       <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//           >
//             <ChevronLeft size={20} />
//             <span className="text-sm font-medium">Back to Home</span>
//           </button>

//           <div className="text-center mb-10">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-semibold mb-4">
//               <Calculator size={16} />
//               Price Prediction
//             </div>
//             <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
//               Predict Property Price
//             </h1>
//             <p className="text-base text-gray-600">
//               Enter property details to get AI-powered price predictions in Indian and Sri Lankan Rupees
//             </p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
//               <strong>Error:</strong> {error}
//             </div>
//           )}

//           <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <MapPin size={16} /> City *
//                   </label>
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select City</option>
//                     {filters?.cities?.map(c => (
//                       <option key={c} value={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <MapPin size={16} /> Locality
//                   </label>
//                   <select
//                     name="locality"
//                     value={formData.locality}
//                     onChange={handleChange}
//                     disabled={!formData.city}
//                     className={selectClass}
//                   >
//                     <option value="">{formData.city ? 'Select Locality' : 'Choose city first'}</option>
//                     {localities.map(l => (
//                       <option key={l} value={l}>{l}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <Building size={16} /> Property Type *
//                   </label>
//                   <select
//                     name="propertyType"
//                     value={formData.propertyType}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select Type</option>
//                     {filters?.propertyTypes?.map(p => (
//                       <option key={p} value={p}>{p}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <Home size={16} /> Furnishing *
//                   </label>
//                   <select
//                     name="furnishing"
//                     value={formData.furnishing}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select Furnishing</option>
//                     {filters?.furnishings?.map(f => (
//                       <option key={f} value={f}>{f}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <Tag size={16} /> Rent / Sale *
//                   </label>
//                   <select
//                     name="RentOrSale"
//                     value={formData.RentOrSale}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select</option>
//                     {filters?.rentSales?.map(r => (
//                       <option key={r} value={r}>{r}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <Bed size={16} /> Bedrooms *
//                   </label>
//                   <select
//                     name="bedrooms"
//                     value={formData.bedrooms}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select</option>
//                     {filters?.bedrooms?.map(b => (
//                       <option key={b} value={b}>{b} BHK</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <Bath size={16} /> Bathrooms *
//                   </label>
//                   <select
//                     name="bathrooms"
//                     value={formData.bathrooms}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select</option>
//                     {filters?.bathrooms?.map(b => (
//                       <option key={b} value={b}>{b}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <Layers size={16} /> Floor *
//                   </label>
//                   <select
//                     name="flrNum"
//                     value={formData.flrNum}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select Floor</option>
//                     {filters?.flrNum?.map(f => (
//                       <option key={f} value={f}>{f}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <ArrowUpDown size={16} /> Total Floors *
//                   </label>
//                   <select
//                     name="totalFlrNum"
//                     value={formData.totalFlrNum}
//                     onChange={handleChange}
//                     required
//                     className={selectClass}
//                   >
//                     <option value="">Select</option>
//                     {filters?.totalFlrNum?.map(t => (
//                       <option key={t} value={t}>{t}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' }}>
//                     <Calendar size={16} /> Posted On *
//                   </label>
//                   <input
//                     type="date"
//                     name="postedOn"
//                     value={formData.postedOn}
//                     onChange={handleDateChange}
//                     max={new Date().toISOString().split('T')[0]}
//                     required
//                     className={selectClass}
//                     style={{ colorScheme: 'light' }}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Select a date on or before today</p>
//                 </div>
//               </div>

//               <div className="mt-8 flex justify-center">
//                 <button
//                   type="submit"
//                   disabled={loading || loadingFilters}
//                   className="px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{
//                     background: 'linear-gradient(135deg, #dc2626, #ef4444)',
//                     boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
//                   }}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 size={20} className="animate-spin" />
//                       Predicting...
//                     </>
//                   ) : (
//                     <>
//                       <Calculator size={20} />
//                       Get Price Prediction
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>

//             {prediction && (
//               <div className="mt-10 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #fef2f2, #ffffff)', border: '2px solid #fecaca' }}>
//                 <h3 className="text-xl font-bold text-center mb-6" style={{ color: '#1f2937' }}>
//                   Predicted Price
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="text-center p-4 rounded-xl bg-white shadow-md">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                       <span className="text-lg">🇮🇳</span>
//                       <span className="text-sm font-medium text-gray-600">Indian Rupees</span>
//                     </div>
//                     <p className="text-3xl sm:text-4xl font-bold" style={{ color: '#dc2626' }}>
//                       {formatCurrency(prediction.inr, 'INR')}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">INR</p>
//                   </div>
//                   <div className="text-center p-4 rounded-xl bg-white shadow-md">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                       <span className="text-lg">🇱🇰</span>
//                       <span className="text-sm font-medium text-gray-600">Sri Lankan Rupees</span>
//                     </div>
//                     <p className="text-3xl sm:text-4xl font-bold" style={{ color: '#16a34a' }}>
//                       {formatCurrency(prediction.lkr, 'LKR')}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">LKR</p>
//                   </div>
//                 </div>
//                 <p className="text-xs text-center text-gray-500 mt-4">
//                   * Exchange rate: 1 INR = {INR_TO_LKR_RATE} LKR (approximate)
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-200">
//             <p className="text-sm text-blue-800">
//               <strong>Note:</strong> The predicted price is based on AI analysis of similar properties in the area. Actual prices may vary based on market conditions, property condition, and other factors.
//             </p>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }



import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Calculator, MapPin, Home, Bed, Bath, Building, Layers, ArrowUpDown, Tag, Calendar, ChevronLeft, Loader2 } from 'lucide-react'
import Header from '../components/Header'

const INR_TO_LKR_RATE = 0.46 // Approximate rate: 1 INR = 0.46 LKR

const formatCurrency = (amount, currency = 'INR') => {
  if (amount === null || amount === undefined || isNaN(amount)) return 'N/A'

  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency === 'LKR' ? 'LKR' : 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
  return formatted
}

const calculateDaysAgo = (dateString) => {
  if (!dateString) return 1
  const postedDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  postedDate.setHours(0, 0, 0, 0)
  const diffTime = today - postedDate
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(1, diffDays)
}

export default function PricePredictionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [filters, setFilters] = useState(null)
  const [loadingFilters, setLoadingFilters] = useState(true)
  const [localities, setLocalities] = useState([])
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    city: '',
    locality: '',
    propertyType: '',
    furnishing: '',
    RentOrSale: '',
    bedrooms: '',
    bathrooms: '',
    flrNum: '',
    totalFlrNum: '',
    postedOn: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchFilters()
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

  useEffect(() => {
    if (filters && formData.city && filters.localitiesByCity) {
      const cityLocalities = filters.localitiesByCity[formData.city] || []
      setLocalities(cityLocalities)
      setFormData(prev => ({ ...prev, locality: '' }))
    } else {
      setLocalities([])
    }
  }, [formData.city, filters])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    const today = new Date().toISOString().split('T')[0]

    if (selectedDate > today) {
      return
    }

    setFormData(prev => ({ ...prev, postedOn: selectedDate }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const postedOn_DaysAgo = calculateDaysAgo(formData.postedOn)

      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          city: formData.city,
          locality: formData.locality,
          propertyType: formData.propertyType,
          furnishing: formData.furnishing,
          RentOrSale: formData.RentOrSale,
          bedrooms: parseInt(formData.bedrooms) || 2,
          bathrooms: parseInt(formData.bathrooms) || 2,
          flrNum: formData.flrNum,
          totalFlrNum: parseInt(formData.totalFlrNum) || 5,
          postedOn_DaysAgo: postedOn_DaysAgo || 30
        })
      })

      if (!response.ok) throw new Error('Failed to get prediction')
      const data = await response.json()

      if (data.error) throw new Error(data.error)

      setPrediction({
        inr: data.predicted_price,
        lkr: data.predicted_price * INR_TO_LKR_RATE
      })
    } catch (err) {
      console.error('Error predicting price:', err)
      setError(err.message || 'Failed to get price prediction')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const selectClass = "w-full px-3 py-10 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm " 

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%)' }}>
      <Header />

      <main
        className="relative z-10"
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: '6rem',
          paddingBottom: '3rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '0.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', background: '#fee2e2', color: '#dc2626', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Calculator size={16} />
              Price Prediction
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937', fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.2 }}>
              Predict Property Price
            </h1>
            <p style={{ color: '#4b5563', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
              Enter property details to get AI-powered price predictions in Indian and Sri Lankan Rupees
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-300" style={{padding:'2.5rem'}}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 " >
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium " style={{ color: '#dc2626' ,marginBottom:'0.5rem'}}>
                    <MapPin size={16} /> City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={selectClass} 
                    style ={ {padding:'0.5rem'}}

                  >
                    <option value="">Select City</option>
                    {filters?.cities?.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626', marginBottom:'0.5rem' }}>
                    <MapPin size={16} /> Locality
                  </label>
                  <select
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    disabled={!formData.city}
                    className={selectClass}
                    style={{padding:'0.5rem'}}
                  >
                    <option value="">{formData.city ? 'Select Locality' : 'Choose city first'}</option>
                    {localities.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' , marginBottom:'0.5rem' }}>
                    <Building size={16} /> Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className={selectClass}
                    style ={ {padding:'0.5rem'}}
                  >
                    <option value="">Select Type</option>
                    {filters?.propertyTypes?.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626',marginBottom:'0.5rem' }}>
                    <Home size={16} /> Furnishing *
                  </label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    required
                    className={selectClass}
                    style={{padding:'0.5rem'}}
                  >
                    <option value="">Select Furnishing</option>
                    {filters?.furnishings?.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' ,marginBottom:'0.5rem'}}>
                    <Tag size={16} /> Rent / Sale *
                  </label>
                  <select
                    name="RentOrSale"
                    value={formData.RentOrSale}
                    onChange={handleChange}
                    required
                    className={selectClass}
                    style={{padding:'0.5rem'}}
                  >
                    <option value="">Select</option>
                    {filters?.rentSales?.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626',marginBottom:'0.5rem' }}>
                    <Bed size={16} /> Bedrooms *
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                    className={selectClass}
                    style={{padding:'0.5rem'}}
                  >
                    <option value="">Select</option>
                    {filters?.bedrooms?.map(b => (
                      <option key={b} value={b}>{b} BHK</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626' ,marginBottom:'0.5rem' }}>
                    <Bath size={16} /> Bathrooms *
                  </label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                    className={selectClass}
                    style={{padding:'0.5rem'}}
                  >
                    <option value="">Select</option>
                    {filters?.bathrooms?.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626',marginBottom:'0.5rem' }}>
                    <Layers size={16} /> Floor *
                  </label>
                  <select
                    name="flrNum"
                    value={formData.flrNum}
                    onChange={handleChange}
                    required
                    className={selectClass}
                    style={{padding:'0.5rem'}}
                  >
                    <option value="">Select Floor</option>
                    {filters?.flrNum?.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626',marginBottom:'0.5rem' }}>
                    <ArrowUpDown size={16} /> Total Floors *
                  </label>
                  <select
                    name="totalFlrNum"
                    value={formData.totalFlrNum}
                    onChange={handleChange}
                    required
                    className={selectClass}
                    style={{padding:'0.5rem'}}
                  >
                    <option value="">Select</option>
                    {filters?.totalFlrNum?.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#dc2626',marginBottom:'0.5rem' }}>
                    <Calendar size={16} /> Posted On 
                  </label>
                  <input
                    type="date"
                    name="postedOn"
                    value={formData.postedOn}
                    onChange={handleDateChange}
                    max={new Date().toISOString().split('T')[0]}
                    className={selectClass}
                    style={{ colorScheme: 'light' ,padding:'0.5rem'}}
                  />
                  <p className="text-xs text-gray-500 mt-1">Select a date on or before today</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={loading || loadingFilters}
                  className="px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
                    marginTop:'1rem',
                    padding:'0.75rem'
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <Calculator size={20} />
                      Get Price Prediction
                    </>
                  )}
                </button>
              </div>
            </form>

            {prediction && (
              <div className="mt-10 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #fef2f2, #ffffff)', border: '2px solid #fecaca' ,marginTop:'2rem',padding:'1rem'}}>
                <h3 className="text-xl font-bold text-center mb-6" style={{ color: '#1f2937' }}>
                  Predicted Price
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-xl bg-white shadow-md">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-sm font-medium text-gray-600">Indian Rupees</span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold" style={{ color: '#dc2626' }}>
                      {formatCurrency(prediction.inr, 'INR')}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">INR</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white shadow-md">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg">🇱🇰</span>
                      <span className="text-sm font-medium text-gray-600">Sri Lankan Rupees</span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold" style={{ color: '#16a34a' }}>
                      {formatCurrency(prediction.lkr, 'LKR')}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">LKR</p>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500" style={{ marginTop: '1rem' }}>
                  * Exchange rate: 1 INR = {INR_TO_LKR_RATE} LKR (approximate)
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '0.75rem', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <p style={{ fontSize: '0.875rem', color: '#1e40af' }}>
              <strong>Note:</strong> The predicted price is based on AI analysis of similar properties in the area. Actual prices may vary based on market conditions, property condition, and other factors.
            </p>
          </div>

          {/* User Manual */}
          <div style={{ marginTop: '2.5rem', padding: '2rem', borderRadius: '1.5rem', background: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📖 User Manual — How to Use Price Prediction
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {[
                { step: '1', icon: '🏙️', title: 'Select City & Locality', desc: 'Choose your target city first. The Locality dropdown will populate automatically based on your city selection.' },
                { step: '2', icon: '🏠', title: 'Choose Property Type', desc: 'Select the type of property (Apartment, Villa, House, etc.) and its furnishing status (Furnished, Semi-Furnished, or Unfurnished).' },
                { step: '3', icon: '🛏️', title: 'Enter Room Details', desc: "Specify the number of bedrooms and bathrooms. Also select the property's floor number and total floors in the building." },
                { step: '4', icon: '🏷️', title: 'Rent or Sale?', desc: 'Choose whether you are looking to Rent or Buy (Sale). This significantly affects the predicted price range.' },
                { step: '5', icon: '📅', title: 'Set Posted Date', desc: "Enter the date the property was or will be listed. Use today's date if you're checking current market prices." },
                { step: '6', icon: '🤖', title: 'Get AI Prediction', desc: 'Click "Get Price Prediction". Our AI model will return estimated prices in both Indian Rupees (INR) and Sri Lankan Rupees (LKR).' },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '2rem', height: '2rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #dc2626, #ef4444)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                    {step}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{icon} {title}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', padding: '0.875rem 1rem', borderRadius: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca' }}>
              <p style={{ fontSize: '0.8rem', color: '#991b1b' }}>
                💡 <strong>Tip:</strong> For the most accurate results, fill in all optional fields including Locality and exact floor details. The AI model uses all available data points to refine its prediction.
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}