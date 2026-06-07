# HomeVista Frontend - Setup & Architecture

## 🚀 Project Overview

HomeVista is an AI-powered house price prediction and recommendation system built with React, Vite, and Tailwind CSS. The frontend communicates with a Flask backend that provides ML-based price predictions and property recommendations.

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx          # Main landing page with search bar & carousel
│   │   └── ResultsPage.jsx       # Search results page with property grid
│   ├── components/
│   │   ├── Header.jsx            # Navigation header with logo
│   │   ├── Footer.jsx            # Footer with links & info
│   │   ├── SearchBar.jsx         # Search filter form
│   │   ├── HouseCard.jsx         # Individual property card
│   │   └── RecommendationCarousel.jsx  # Horizontal scrolling carousel
│   ├── App.jsx                   # Main routing component
│   ├── index.css                 # Global styles & Tailwind config
│   ├── App.css                   # App-specific styles
│   └── main.jsx                  # React entry point
├── public/                       # Static assets
├── index.html                    # HTML entry point
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
└── tailwind.config.js            # Tailwind CSS config
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or similar)

### 3. Ensure Backend is Running
The Flask backend should be running on `http://localhost:5000`:
```bash
# In the project root (Idet-capstone-1)
python app.py
```

## 📖 Page Descriptions

### Home Page (`/`)
**Features:**
- Large search bar with dropdown filters for:
  - City, Locality, Property Type
  - Furnishing, Rent/Sale status
  - Bedrooms, Bathrooms, Floor numbers
- Feature highlight section explaining HomeVista benefits
- Horizontal scrolling carousel of trending properties
- Dynamic loading states with shimmer placeholders

**API Calls:**
- `GET /api/filters` - Fetches filter options
- `GET /api/random-recommendations` - Gets 10 random properties with predicted prices

### Results Page (`/results`)
**Features:**
- Shows search results in a responsive grid layout (3 columns on desktop, 1-2 on mobile)
- Each property card displays:
  - Property image (Unsplash API with property-type keywords)
  - Predicted price with AI-calculated value
  - Rent/Sale badge
  - Key features: BHK, Bathrooms, Furnishing status
  - Location information
  - Link to original listing
- Back button to return to search
- Loading and error states with retry functionality

**API Calls:**
- `POST /api/recommend` - Fetches recommendations based on search parameters

## 🎨 Design System

### Color Palette
- **Primary**: Indigo/Purple gradient (#6366f1 to #8b5cf6)
- **Background**: Deep slate (#0f172a, #1e293b)
- **Text**: Light slate (#f1f5f9, #e2e8f0)
- **Accent**: Purple (#a78bfa)
- **Success**: Green (#10b981)

### Typography
- **Primary Font**: Outfit (for headers)
- **Body Font**: Inter (for content)
- **Sizes**: Responsive with Tailwind scales

### Key Classes
- `.glass-card` - Glassmorphic effect with blur
- `.btn-gradient` - Gradient button with hover effects
- `.carousel-container` - Horizontal scrolling layout
- `.animate-fade-in` - Fade-in animation
- `.price-tag` - Green price badge styling

## 🔗 API Integration

All API calls are made to `http://localhost:5000`

### Available Endpoints:
1. **GET /api/health** - Check backend status
2. **GET /api/filters** - Get all filter options
3. **POST /api/predict** - Get price prediction for single property
4. **POST /api/recommend** - Get recommendations based on search
5. **GET /api/random-recommendations** - Get 10 random recommendations

### Sample Request Body (for /api/recommend):
```json
{
  "city": "Patna",
  "locality": "Kankarbagh",
  "propertyType": "Multistorey Apartment",
  "furnishing": "Semi-Furnished",
  "RentOrSale": "Rent",
  "bedrooms": 2,
  "bathrooms": 2,
  "flrNum": "Ground",
  "totalFlrNum": 5,
  "postedOn_DaysAgo": 30
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px (single column layouts)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3+ columns)

## 🚀 Build for Production

```bash
npm run build
```
Creates optimized production build in `dist/` folder

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
- Ensure Flask app is running on port 5000
- Check CORS is enabled in Flask app
- Verify no firewall is blocking port 5000

### Issue: "No properties found"
- Ensure training pipeline has been run
- Check that data CSV exists at `NOTEBOOK/DATA/House_Price_Prediction.csv`
- Verify prediction model artifacts exist

### Issue: Images not loading
- Unsplash API might be rate-limited or offline
- Fallback to placeholder images (handled automatically)
- Check network tab in browser dev tools

## 📦 Dependencies

Key packages:
- **react** (^19.2.6) - UI library
- **react-router-dom** - Client-side routing
- **tailwindcss** (^4.3.0) - Utility-first CSS
- **lucide-react** (^1.16.0) - Icon library
- **vite** (^8.0.12) - Build tool

## 🔐 Security Notes

- All sensitive data (API keys, credentials) should be in `.env` files
- CORS is configured on backend - modify if needed
- User inputs are validated on both frontend and backend

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vite.dev)
