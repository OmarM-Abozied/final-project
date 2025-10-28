# 🏙️ Real Estate Projects Marketplace

A modern, AI-powered real estate projects marketplace built with React, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

### Core Functionality
- 📍 Browse projects from multiple developers
- 🔍 Advanced search (city, developer, project name)
- 🎯 Filter by status (All, Under Construction, Completed, Upcoming)
- 📊 Detailed project views with image galleries
- 📧 Contact developers via inquiry forms
- 📈 Construction progress tracking

### AI-Powered Features
- 🤖 AI Real Estate Assistant chatbot
- ✨ Personalized project recommendations
- 💬 Natural language query processing
- 🎯 Smart filter interpretation

### User Experience
- ⚡ Smooth Framer Motion animations
- 📱 Fully responsive design
- 🎨 Consistent design system
- 🖼️ Image galleries with navigation
- 💫 Hover effects and transitions

## 🎨 Design System

```css
--primary-navy: #1e3a5f
--accent-gold: #d4af37
--light-gold: #f5e6a8
--text-dark: #2c3e50
--text-light: #6c757d
```

## 🚀 Quick Start

### Standalone Mode
```bash
npm run dev
```
Navigate to: `http://localhost:3000/ai-agent-page/marketplace.html`

### Integrated Mode
```jsx
import Marketplace from './pages/Marketplace';

<Route path="/marketplace" element={<Marketplace />} />
```

## 📦 Components

| Component | Description |
|-----------|-------------|
| **ProjectsHero** | Hero section with search and filters |
| **ProjectFilterBar** | Status filter buttons (4 categories) |
| **ProjectCard** | Individual project display card |
| **ProjectDetailsModal** | Full project details with gallery |
| **ProjectFeatures** | Amenities grid with icons |
| **DeveloperInfoCard** | Developer information and contact |
| **InquiryForm** | Contact developer form |
| **AiChatButton** | Floating AI assistant button |
| **AiChatModal** | Full chat interface |
| **AiRecommendationSection** | Horizontal scroll recommendations |

## 📊 Data Structure

```javascript
{
  id: 1,
  name: "Marina Bay Residences",
  city: "Dubai Marina",
  developer: "Elite Developments",
  status: "under-construction",
  price: "1.8M AED",
  units: 45,
  completionPercentage: 75,
  features: ["Security", "Parking", "Pool", "Gym"],
  description: "Luxury waterfront living...",
  images: ["url1", "url2", "url3"],
  developerInfo: { ... }
}
```

## 🤖 AI Features

### Chat Assistant
- Natural language understanding
- Context-aware responses
- Quick question suggestions
- Typing indicators

### Smart Filtering
```javascript
import { parseQuery, applyFilters } from './utils/AiFilterInterpreter';

const filters = parseQuery("Luxury villas in Dubai under 5M");
const results = applyFilters(projects, filters);
```

### Recommendations
- Personalized based on preferences
- Horizontal scrolling interface
- Gold "AI" badge on recommended cards

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): 1 column, bottom sheet chat
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): 3 columns, centered modals

## 🎯 Sample Projects

Includes 8 pre-configured projects:
1. Marina Bay Residences (Dubai Marina)
2. Downtown Luxury Towers (Downtown Dubai)
3. Palm Beachfront Villas (Palm Jumeirah)
4. Business Bay Complex (Business Bay)
5. Green Valley Residence (New Cairo)
6. JBR Beach Apartments (Jumeirah Beach)
7. Arabian Ranches Estate (Arabian Ranches)
8. Sheikh Zayed Towers (Sheikh Zayed)

## 🔧 Customization

### Add Custom Project
```javascript
// src/marketplace/data/sampleProjects.js
export const sampleProjects = [
  ...existingProjects,
  {
    id: 9,
    name: "Your Project",
    city: "Your City",
    // ... full project data
  }
];
```

### Customize AI Responses
```javascript
// src/marketplace/components/AiChatModal.jsx
const generateAiResponse = (query) => {
  if (query.includes('your-keyword')) {
    return "Your custom response";
  }
  // ...
};
```

### Add Features
```javascript
// src/marketplace/components/ProjectFeatures.jsx
const featureConfig = {
  'Your Feature': { icon: YourIcon, color: 'text-color' },
  // ...
};
```

## 🎬 Animations

All animations use Framer Motion:
- Fade-in on page load
- Hover lift effects on cards
- Spring animations for modals
- Staggered grid animations
- Smooth scrolling recommendations

## 📄 Files

```
src/marketplace/
├── components/        (10 components)
├── pages/            (ProjectsMarketplace)
├── data/             (sampleProjects)
├── utils/            (AiFilterInterpreter)
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## 🌐 Integration

### With React Router
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './pages/Marketplace';

<Routes>
  <Route path="/marketplace" element={<Marketplace />} />
</Routes>
```

### With Your API
```javascript
// Replace sampleProjects with API call
const [projects, setProjects] = useState([]);

useEffect(() => {
  fetch('/api/projects')
    .then(res => res.json())
    .then(data => setProjects(data));
}, []);
```

## 🎨 Styling

- Tailwind CSS for utility classes
- Custom CSS variables for theme
- Framer Motion for animations
- React Icons for all icons

## 📝 License

MIT

---

**Built with ❤️ using React, Vite, Tailwind CSS, and Framer Motion**
