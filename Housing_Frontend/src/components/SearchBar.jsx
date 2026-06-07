

// import React, { useState, useEffect } from 'react'
// import { Search, MapPin, Home, Bed, Bath, Building, Layers, ArrowUpDown, Tag } from 'lucide-react'

// export default function SearchBar({ onSearch, filters, loading }) {
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
//     postedOn_DaysAgo: '30'
//   })

//   const [localities, setLocalities] = useState([])

//   // Update localities when city changes
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

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Only send non-empty fields
//     const cleaned = {}
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== '') cleaned[key] = value
//     })
//     onSearch(cleaned)
//   }

//   const selectClass = "custom-select"

//   return (
//     <div 
//       className="glass-card animate-fade-in" 
//       id="search-bar"
//       style={{
//         padding: '2rem',
//         border: '3px solid #dc2626',
//         borderRadius: '1.5rem',
//         backgroundColor: 'rgba(255, 255, 255, 0.95)',
//         boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
//       }}
//     >
//       <div className="text-center mb-8">
//         <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
//           Find Your Dream Home
//         </h2>
//         <p className="text-base" style={{ color: '#6b7280',padding:'2rem' }}>
//           Select your preferences and discover AI-recommended properties with predicted prices
//         </p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
//           {/* City */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <MapPin size={16} /> City
//             </label>
//             <select 
//               name="city" 
//               value={formData.city} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-city"
//             >
//               <option value="">Select City</option>
//               {filters?.cities?.map(c => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//           </div>

//           {/* Locality */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <MapPin size={16} /> Locality
//             </label>
//             <select 
//               name="locality" 
//               value={formData.locality} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-locality" 
//               disabled={!formData.city}
//             >
//               <option value="">{ formData.city ? 'Select Locality' : 'Choose city first' }</option>
//               {localities.map(l => (
//                 <option key={l} value={l}>{l}</option>
//               ))}
//             </select>
//           </div>

//           {/* Property Type */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <Building size={16} /> Property Type
//             </label>
//             <select 
//               name="propertyType" 
//               value={formData.propertyType} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-property-type"
//             >
//               <option value="">Select Type</option>
//               {filters?.propertyTypes?.map(p => (
//                 <option key={p} value={p}>{p}</option>
//               ))}
//             </select>
//           </div>

//           {/* Furnishing */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <Home size={16} /> Furnishing
//             </label>
//             <select 
//               name="furnishing" 
//               value={formData.furnishing} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-furnishing"
//             >
//               <option value="">Select Furnishing</option>
//               {filters?.furnishings?.map(f => (
//                 <option key={f} value={f}>{f}</option>
//               ))}
//             </select>
//           </div>

//           {/* Rent or Sale */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <Tag size={16} /> Rent / Sale
//             </label>
//             <select 
//               name="RentOrSale" 
//               value={formData.RentOrSale} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-rent-sale"
//             >
//               <option value="">Select</option>
//               {filters?.rentSales?.map(r => (
//                 <option key={r} value={r}>{r}</option>
//               ))}
//             </select>
//           </div>

//           {/* Bedrooms */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <Bed size={16} /> Bedrooms
//             </label>
//             <select 
//               name="bedrooms" 
//               value={formData.bedrooms} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-bedrooms"
//             >
//               <option value="">Select</option>
//               {filters?.bedrooms?.map(b => (
//                 <option key={b} value={b}>{b} BHK</option>
//               ))}
//             </select>
//           </div>

//           {/* Bathrooms */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <Bath size={16} /> Bathrooms
//             </label>
//             <select 
//               name="bathrooms" 
//               value={formData.bathrooms} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-bathrooms"
//             >
//               <option value="">Select</option>
//               {filters?.bathrooms?.map(b => (
//                 <option key={b} value={b}>{b}</option>
//               ))}
//             </select>
//           </div>

//           {/* Floor Number */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <Layers size={16} /> Floor
//             </label>
//             <select 
//               name="flrNum" 
//               value={formData.flrNum} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-floor"
//             >
//               <option value="">Select Floor</option>
//               {filters?.flrNum?.map(f => (
//                 <option key={f} value={f}>{f}</option>
//               ))}
//             </select>
//           </div>

//           {/* Total Floors */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
//               <ArrowUpDown size={16} /> Total Floors
//             </label>
//             <select 
//               name="totalFlrNum" 
//               value={formData.totalFlrNum} 
//               onChange={handleChange} 
//               className={selectClass}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 border: '1px solid #e5e7eb',
//                 backgroundColor: '#f9fafb',
//                 width: '100%'
//               }}
//               id="filter-total-floors"
//             >
//               <option value="">Select</option>
//               {filters?.totalFlrNum?.map(t => (
//                 <option key={t} value={t}>{t}</option>
//               ))}
//             </select>
//           </div>

//           {/* Search Button */}
//           <div className="flex items-end">
//             <button 
//               type="submit" 
//               className="btn-gradient w-full flex items-center justify-center gap-2" 
//               disabled={loading}
//               style={{
//                 padding: '0.75rem',
//                 borderRadius: '0.75rem',
//                 fontSize: '1rem',
//                 fontWeight: '600'
//               }}
//               id="search-btn"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   <Search size={18} />
//                   Search
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react'
import { Search, MapPin, Home, Bed, Bath, Building, Layers, ArrowUpDown, Tag, Calendar } from 'lucide-react'

export default function SearchBar({ onSearch, filters, loading }) {
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
    postedOn_DaysAgo: '30'
  })

  const [localities, setLocalities] = useState([])
  const [selectedDate, setSelectedDate] = useState('') // YYYY-MM-DD

  // Update localities when city changes
  useEffect(() => {
    if (filters && formData.city && filters.localitiesByCity) {
      const cityLocalities = filters.localitiesByCity[formData.city] || []
      setLocalities(cityLocalities)
      setFormData(prev => ({ ...prev, locality: '' }))
    } else {
      setLocalities([])
    }
  }, [formData.city, filters])

  // Helper to compute days difference from today
  const computeDaysAgo = (dateString) => {
    if (!dateString) return '30' // default
    const selected = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    selected.setHours(0, 0, 0, 0)
    const diffTime = today - selected
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return '0' // future not allowed, but input prevents it
    return diffDays.toString()
  }

  const handleDateChange = (e) => {
    const dateValue = e.target.value
    setSelectedDate(dateValue)
    const daysAgo = computeDaysAgo(dateValue)
    setFormData(prev => ({ ...prev, postedOn_DaysAgo: daysAgo }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ensure postedOn_DaysAgo is sent even if no date selected (default 30)
    const cleaned = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '') cleaned[key] = value
    })
    onSearch(cleaned)
  }

  const selectClass = "custom-select"
  const today = new Date().toISOString().split('T')[0] // max date for input

  return (
    <div 
      className="glass-card animate-fade-in" 
      id="search-bar"
      style={{
        padding: '2rem',
        border: '3px solid #dc2626',
        borderRadius: '1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#1f2937' }}>
          Find Your Dream Home
        </h2>
        <p className="text-base" style={{ color: '#6b7280', padding: '2rem' }}>
          Select your preferences and discover AI-recommended properties with predicted prices
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Filter fields grid - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          {/* City */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <MapPin size={16} /> City
            </label>
            <select 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-city"
            >
              <option value="">Select City</option>
              {filters?.cities?.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Locality */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <MapPin size={16} /> Locality
            </label>
            <select 
              name="locality" 
              value={formData.locality} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-locality" 
              disabled={!formData.city}
            >
              <option value="">{ formData.city ? 'Select Locality' : 'Choose city first' }</option>
              {localities.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <Building size={16} /> Property Type
            </label>
            <select 
              name="propertyType" 
              value={formData.propertyType} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-property-type"
            >
              <option value="">Select Type</option>
              {filters?.propertyTypes?.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Furnishing */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <Home size={16} /> Furnishing
            </label>
            <select 
              name="furnishing" 
              value={formData.furnishing} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-furnishing"
            >
              <option value="">Select Furnishing</option>
              {filters?.furnishings?.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Rent or Sale */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <Tag size={16} /> Rent / Sale
            </label>
            <select 
              name="RentOrSale" 
              value={formData.RentOrSale} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-rent-sale"
            >
              <option value="">Select</option>
              {filters?.rentSales?.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <Bed size={16} /> Bedrooms
            </label>
            <select 
              name="bedrooms" 
              value={formData.bedrooms} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-bedrooms"
            >
              <option value="">Select</option>
              {filters?.bedrooms?.map(b => (
                <option key={b} value={b}>{b} BHK</option>
              ))}
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <Bath size={16} /> Bathrooms
            </label>
            <select 
              name="bathrooms" 
              value={formData.bathrooms} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-bathrooms"
            >
              <option value="">Select</option>
              {filters?.bathrooms?.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Floor Number */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <Layers size={16} /> Floor
            </label>
            <select 
              name="flrNum" 
              value={formData.flrNum} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-floor"
            >
              <option value="">Select Floor</option>
              {filters?.flrNum?.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Total Floors */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <ArrowUpDown size={16} /> Total Floors
            </label>
            <select 
              name="totalFlrNum" 
              value={formData.totalFlrNum} 
              onChange={handleChange} 
              className={selectClass}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              id="filter-total-floors"
            >
              <option value="">Select</option>
              {filters?.totalFlrNum?.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Date Posted */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#dc2626' }}>
              <Calendar size={16} /> Date Posted
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={today}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb',
                width: '100%'
              }}
              className="custom-date"
            />
            <p className="text-xs mt-1 text-gray-500">
              {selectedDate ? `Posted within ${computeDaysAgo(selectedDate)} days` : 'Default: 30 days'}
            </p>
          </div>
        </div>

        {/* Centered Search Button - outside the grid */}
        <div className="flex justify-center mt-8">
          <button 
            type="submit" 
            className="btn-gradient px-8 py-3 rounded-xl font-semibold text-lg min-w-[200px] flex items-center justify-center gap-2" 
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #dc2626, #ef4444)',
              color: '#ffffff',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            id="search-btn"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Search size={18} />
                Search
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}