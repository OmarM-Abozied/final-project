# AI Agent Pricing & Marketing Page

A modern, responsive, and professional pricing & marketing page for a real estate SaaS platform's "AI Agent" feature. Built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, professional UI that builds trust with potential customers
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Component-Based**: Modular architecture with reusable components
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
src/
  components/ai-agent-pricing/
    HeroSection.jsx         # Hero section with main CTA
    FeaturesSection.jsx     # Features showcase with icons
    PricingPlans.jsx        # Pricing tiers with toggle
    VirtualAgentPreview.jsx # Interactive chat demo
    CTASection.jsx          # Call-to-action section
    FAQSection.jsx          # Expandable FAQ accordion
  pages/
    AiAgentPlans.jsx        # Main page component
  main.jsx                  # React entry point
  index.css                 # Global styles and Tailwind imports
```

## 🎨 Color Palette

- **Primary Navy**: `#1e3a5f` - Main brand color
- **Accent Gold**: `#d4af37` - Highlight color for CTAs
- **Light Gold**: `#f5e6a8` - Subtle accent
- **Text Dark**: `#2c3e50` - Primary text
- **Text Light**: `#6c757d` - Secondary text
- **Light Gray**: `#f8f9fa` - Background sections
- **Border Light**: `#e9ecef` - Subtle borders

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📦 Dependencies

### Core Dependencies
- **React 18.2.0** - UI library
- **React DOM 18.2.0** - DOM rendering
- **Framer Motion 10.16.4** - Animation library
- **Heroicons 2.0.18** - Icon library

### Development Dependencies
- **Vite 4.4.5** - Build tool and dev server
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing
- **ESLint** - Code linting

## 🧱 Component Details

### HeroSection.jsx
- Full-width hero with animated background
- Compelling headline and description
- Primary CTA button with hover effects
- Trust indicators and scroll indicator

### FeaturesSection.jsx
- 8 feature cards in responsive grid
- Animated icons using Heroicons
- Hover effects and staggered animations
- Bottom CTA section

### PricingPlans.jsx
- Three pricing tiers (Basic, Pro, Enterprise)
- Monthly/Annual billing toggle with discount
- Feature comparison with checkmarks
- Popular plan highlight

### VirtualAgentPreview.jsx
- Interactive chat interface mockup
- Animated typing indicators
- Auto-playing message sequence
- Mobile phone frame design

### CTASection.jsx
- Statistics showcase
- Main call-to-action content
- Multiple CTA buttons
- Animated background elements

### FAQSection.jsx
- Accordion-style FAQ
- Smooth expand/collapse animations
- Common questions about the service
- Support contact options

## 🎯 Key Features Implemented

- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Entrance animations, hover effects, and micro-interactions
- **Professional UI**: Clean design that builds trust and credibility
- **Interactive Elements**: Pricing toggle, FAQ accordion, chat preview
- **Performance Optimized**: Fast loading with Vite build system
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🚀 Usage

This page is designed to be integrated into a larger real estate SaaS platform. You can:

1. **Standalone Usage**: Deploy as a separate landing page
2. **Integration**: Import components into existing React application
3. **Customization**: Modify colors, content, and styling via Tailwind classes
4. **A/B Testing**: Easy to create variants by copying components

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.js`:
```javascript
colors: {
  'primary-navy': '#1e3a5f',
  'accent-gold': '#d4af37',
  // ... other colors
}
```

### Content
Modify text content directly in each component file. All content is stored as JavaScript variables for easy editing.

### Animations
Adjust Framer Motion animations by modifying the `variants` objects in each component.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development Notes

- Uses Vite for fast development and building
- ESLint configured for React best practices
- PostCSS processes Tailwind directives
- All animations are GPU-accelerated for smooth performance
- Components are designed for easy theming and customization

## 🚀 Deployment

The built files will be in the `dist` directory after running `npm run build`. Deploy to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static file server

## 📝 License

MIT License - feel free to use in personal and commercial projects.

---

**Ready to transform your real estate business with AI?** 🏠✨