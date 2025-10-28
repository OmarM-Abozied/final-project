# Real Estate Developer Dashboard

A modern, responsive developer dashboard built with React, Vite, Tailwind CSS, and Framer Motion.

## 🎨 Design System

The dashboard follows a consistent color scheme:

```css
--primary-navy: #1e3a5f;
--accent-gold: #d4af37;
--light-gold: #f5e6a8;
--text-dark: #2c3e50;
--text-light: #6c757d;
--white: #ffffff;
--light-gray: #f8f9fa;
--border-light: #e9ecef;
```

## 🧱 Components

### DeveloperHero.jsx
- Hero section with developer profile
- Company logo and tagline
- Gradient background with decorative elements
- "Manage Projects" CTA button

### DeveloperStats.jsx
- Responsive stats grid (4 cards)
- Displays: Total Projects, Active Listings, Total Views, Client Requests
- Hover animations with gold accent borders
- Icon integration using react-icons

### ProjectCard.jsx
- Modern project card with image banner
- Project details: name, city, units available
- Completion percentage with progress bar
- Hover effects and action buttons (View Details, Edit)

### ProjectsGrid.jsx
- Responsive grid layout for multiple projects
- Staggered animations using Framer Motion
- Empty state handling
- Project count badge

### AddProjectForm.jsx
- Modal form for adding new projects
- Fields: Project Name, Location, Description, Units Count
- Drag-and-drop image upload (max 5 images)
- Image preview with remove functionality
- Form validation

### DeveloperDashboard.jsx
- Main dashboard component combining all sections
- State management for projects and stats
- Fixed "+ Add Project" button (bottom-right on mobile)
- Responsive layout with padding and shadows

## 🚀 Running the Dashboard

### Standalone Mode
```bash
npm run dev
```
Then navigate to: `http://localhost:5173/developer-dashboard.html`

### Integrated Mode
Import the `DeveloperDashboardPage` component in your routing:
```jsx
import DeveloperDashboardPage from './pages/DeveloperDashboard';
```

## 📱 Responsive Design

- **Mobile**: Single column layout, fixed add button at bottom-right
- **Tablet**: 2-column grid for projects, 2-column stats
- **Desktop**: 3-column grid for projects, 4-column stats

## ✨ Features

- Smooth Framer Motion animations
- Hover effects and transitions
- Gold accent borders on hover
- Gradient backgrounds
- Custom scrollbar styling
- Modal form with drag-and-drop upload
- Dynamic stats updates when adding projects
- Progress bars with color coding (green, gold, blue based on completion)

## 🛠️ Technologies

- React 18.2
- Vite 4.4
- Tailwind CSS 3.4
- Framer Motion 10.16
- React Icons 5.5

## 📦 File Structure

```
src/developer_dashboard/
├── components/
│   ├── DeveloperHero.jsx
│   ├── DeveloperStats.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectsGrid.jsx
│   ├── AddProjectForm.jsx
│   └── DeveloperDashboard.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## 🎯 Usage Example

```jsx
import DeveloperDashboard from './developer_dashboard/components/DeveloperDashboard';

function App() {
  return <DeveloperDashboard />;
}
```

## 🔧 Customization

You can customize the dashboard by passing props:

```jsx
<DeveloperHero 
  developer={{
    name: "Your Company",
    tagline: "Your Tagline",
    profilePhoto: "url",
    companyLogo: "url"
  }}
/>

<DeveloperStats 
  stats={{
    totalProjects: 24,
    activeListings: 156,
    totalViews: 45230,
    clientRequests: 89
  }}
/>

<ProjectsGrid projects={yourProjectsArray} />
```

## 📝 License

MIT
