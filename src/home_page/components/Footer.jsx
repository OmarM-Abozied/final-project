import { Home, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-navy text-white pt-12 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="text-accent-gold text-xl font-semibold mb-6 flex items-center gap-2">
              <Home className="w-5 h-5" />
              DreamHome Realty
            </h5>
            <p className="mb-6 text-white/80 leading-relaxed">
              Your trusted partner in finding the perfect home. We're committed to making your real estate dreams come true.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center hover:bg-white hover:text-primary-navy transition-all duration-300 hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center hover:bg-white hover:text-primary-navy transition-all duration-300 hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center hover:bg-white hover:text-primary-navy transition-all duration-300 hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center hover:bg-white hover:text-primary-navy transition-all duration-300 hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-accent-gold text-xl font-semibold mb-6">Quick Links</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-accent-gold text-xl font-semibold mb-6">Services</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Buy a Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Sell a Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Rent a Property
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent-gold transition-colors">
                  Investment Properties
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-accent-gold text-xl font-semibold mb-6">Contact Info</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/80">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>123 Real Estate Ave, City, State 12345</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@dreamhome.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <span>Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>&copy; 2024 DreamHome Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
