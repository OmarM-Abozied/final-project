import { Search, X } from "lucide-react";

export default function PropertyFilter({ onFilter }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const filters = {
      propertyType: formData.get("propertyType"),
      priceRange: formData.get("priceRange"),
      location: formData.get("location"),
      bedrooms: formData.get("bedrooms"),
      transactionType: formData.get("transactionType"), // ✅ أضفناها هنا
    };

    onFilter(filters);
  };
  const handleReset = () => {
    onFilter({
      propertyType: "",
      priceRange: "",
      location: "",
      bedrooms: "",
      transactionType: "", // ✅ نرجعها فاضية لما يعمل Clear
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl -mt-12 relative z-10 border border-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 items-end">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="propertyType"
            className="block mb-2 text-text-dark font-medium text-sm"
          >
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/10 bg-white"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="villa">Villa</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="priceRange"
            className="block mb-2 text-text-dark font-medium text-sm"
          >
            Price Range
          </label>
          <select
            id="priceRange"
            name="priceRange"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/10 bg-white"
          >
            <option value="">Any Price</option>
            <option value="100000-300000">$100k - $300k</option>
            <option value="300000-500000">$300k - $500k</option>
            <option value="500000-750000">$500k - $750k</option>
            <option value="750000-1000000">$750k - $1M</option>
            <option value="1000000+">$1M+</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="location"
            className="block mb-2 text-text-dark font-medium text-sm"
          >
            Location
          </label>
          <select
            id="location"
            name="location"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/10 bg-white"
          >
            <option value="">All Locations</option>
            <option value="Beverly Hills, CA">Beverly Hills, CA</option>
            <option value="Manhattan, NY">Manhattan, NY</option>
            <option value="Miami Beach, FL">Miami Beach, FL</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="Chicago, IL">Chicago, IL</option>
            <option value="Boston, MA">Boston, MA</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="bedrooms"
            className="block mb-2 text-text-dark font-medium text-sm"
          >
            Bedrooms
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/10 bg-white"
          >
            <option value="">Any</option>
            <option value="1">1+ Bed</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
            <option value="5">5+ Beds</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="transactionType"
            className="block mb-2 text-text-dark font-medium text-sm"
          >
            Transaction
          </label>
          <select
            id="transactionType"
            name="transactionType"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg transition-all focus:outline-none focus:border-accent-gold focus:ring-4 focus:ring-accent-gold/10 bg-white"
          >
            <option value="">Any</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="both">For Sale / Rent</option>{" "}
          </select>
        </div>

        <div className="min-w-[140px]">
          <button
            type="submit"
            className="w-full bg-primary-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>

        <div className="min-w-[100px]">
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-transparent text-text-light border-2 border-gray-200 px-6 py-3 rounded-lg font-medium hover:border-primary-navy hover:text-primary-navy transition-all duration-300 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
