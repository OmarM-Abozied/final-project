import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PropertyFilter from './components/PropertyFilter';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import { properties as allProperties } from './data/properties';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getALLproperty } from '../redux/slices/propertySlice';


function App() {
  const dispatch = useDispatch();
  // read from the `properties` reducer slice
  const allProperties = useSelector(
    (state) => state.propertiesReducer.properties || []
  );

  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("price-low");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      await dispatch(getALLproperty());
      setLoading(false);
    };
    fetchProperties();
  }, [dispatch]);

  // Sync displayedProperties with allProperties
  useEffect(() => {
    setDisplayedProperties(allProperties);
  }, [allProperties]);

  // Handle filters
  const handleFilter = (filters) => {
    setLoading(true);
    setCurrentPage(1);

    setTimeout(() => {
      let filtered = [...allProperties];

      if (filters.propertyType) {
        filtered = filtered.filter((p) => p.type === filters.propertyType);
      }

      if (filters.bedrooms) {
        const minBeds = parseInt(filters.bedrooms);
        filtered = filtered.filter((p) => p.bedrooms >= minBeds);
      }

      if (filters.priceRange) {
        if (filters.priceRange === "1000000+") {
          filtered = filtered.filter((p) => p.price >= 1000000);
        } else {
          const [min, max] = filters.priceRange.split("-").map(Number);
          filtered = filtered.filter((p) => p.price >= min && p.price <= max);
        }
      }

      if (filters.transactionType) {
        filtered = filtered.filter(
          (p) => p.listingStatus === filters.transactionType
        );
      }

      if (filters.location) {
        filtered = filtered.filter(
          (p) =>
            p.location.city === filters.location ||
            p.location.area === filters.location
        );
      }

      setDisplayedProperties(filtered);
      setLoading(false);
    }, 300);
  };

  // Handle sorting
  const handleSort = (value) => {
    const option = value;
    setSortBy(option);
    setCurrentPage(1);

    const sorted = [...displayedProperties];

    switch (option) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "bedrooms":
        sorted.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case "location":
        sorted.sort((a, b) => a.location.city.localeCompare(b.location.city));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setDisplayedProperties(sorted);
  };

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = displayedProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(displayedProperties.length / propertiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative bg-gradient-to-br from-primary-navy to-primary-navy/80 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white text-center mb-4 animate-slideInDown">
            Our Properties
          </h1>
          <p className="text-white/90 text-xl text-center animate-slideInUp">
            Discover your perfect home from our curated collection of premium
            properties
          </p>
        </div>
      </section>

      <section className="bg-white py-8 shadow-sm border-b">
        <div className="container mx-auto px-4">
          <PropertyFilter onFilter={handleFilter} />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-lg text-text-dark font-medium">
            <strong className="text-2xl text-primary-navy">
              {displayedProperties.length}
            </strong>{" "}
            properties found
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-text-dark font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-text-dark focus:outline-none focus:border-accent-gold"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-accent-gold rounded-full animate-spin mb-4"></div>
            <p className="text-text-light text-lg">Loading properties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentProperties.map((property, index) => (
              <PropertyCard
                key={property._id}
                property={property}
                index={index}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 py-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-text-dark hover:bg-primary-navy hover:text-white hover:border-primary-navy transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === page
                    ? "bg-primary-navy text-white"
                    : "border border-gray-200 text-text-dark hover:bg-primary-navy hover:text-white hover:border-primary-navy"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-text-dark hover:bg-primary-navy hover:text-white hover:border-primary-navy transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
