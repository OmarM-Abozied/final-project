import React from 'react';
import { Building2 } from 'lucide-react';

const Logo = ({ className = "w-12 h-12" }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Logo Background */}
        <div 
          className="p-3 rounded-xl shadow-lg border-2"
          style={{ 
            background: `linear-gradient(135deg, var(--primary-navy), rgba(30, 58, 95, 0.8))`,
            borderColor: 'rgba(212, 175, 55, 0.2)'
          }}
        >
          <Building2 className={`${className} text-white`} />
        </div>
        {/* Golden Accent Corner */}
        <div 
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm"
          style={{ 
            background: `linear-gradient(135deg, var(--accent-gold), rgba(212, 175, 55, 0.8))`
          }}
        ></div>
        {/* Small indicator dot */}
        <div 
          className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: 'var(--accent-gold)' }}
        ></div>
      </div>
    </div>
  );
};

export default Logo;