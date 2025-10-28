import { Bed, Bath, Maximize, Eye, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property, index }) {
  // const handleViewDetails = () => {
  //   alert(`Loading details for: ${property.title}`);
  // };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 opacity-0 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={
            property.images && property.images.length > 0
              ? property.images[0]
              : "/placeholder.jpg" // ممكن تحط صورة افتراضية
          }
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.featured && (
            <span className="bg-accent-gold text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              Featured
            </span>
          )}
          {property.isNew && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              New
            </span>
          )}
        </div>

        {property.listingStatus && (
          <span
            className={`absolute top-4 right-4 ${
              property.listingStatus === "rent"
                ? "bg-blue-500"
                : property.listingStatus === "sale"
                ? "bg-emerald-500"
                : "bg-purple-500"
            } text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}
          >
            {property.listingStatus === "both"
              ? "For Sale / Rent"
              : property.listingStatus === "rent"
              ? "For Rent"
              : "For Sale"}
          </span>
        )}

        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-primary-navy px-4 py-2 rounded-full font-bold text-xl shadow-lg">
          ${property.price?.toLocaleString() || "N/A"}
        </div>
      </div>

      <div className="p-7">
        <h4 className="text-2xl font-semibold text-primary-navy mb-2 group-hover:text-accent-gold transition-colors">
          {property.title}
        </h4>

        <div className="flex items-center text-text-light mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>
            {property.location?.city || "Unknown city"}
            {property.location?.area ? ` - ${property.location.area}` : ""}
          </span>
        </div>

        <p className="text-text-dark mb-6 leading-relaxed">
          {property.description}
        </p>

        <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-1.5 text-text-light">
            <Bed className="w-4 h-4 text-accent-gold" />
            <span className="text-xs">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-light">
            <Bath className="w-4 h-4 text-accent-gold" />
            <span className="text-xs">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-light">
            <Maximize className="w-4 h-4 text-accent-gold" />

            <span className="text-xs">
              {property.area ? property.area.toLocaleString() : "N/A"} sq ft
            </span>
          </div>
        </div>
        <Link to={"/details"} state={property}>
          <button
            // onClick={handleViewDetails}
            className="w-full bg-primary-navy text-white py-3.5 rounded-full font-medium hover:bg-accent-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            <Eye className="w-5 h-5" />
            <span>View Details</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
