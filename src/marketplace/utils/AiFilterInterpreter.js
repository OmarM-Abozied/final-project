/**
 * AI Filter Interpreter
 * Parses natural language queries into structured search filters
 */

export const parseQuery = (query) => {
  const lowerQuery = query.toLowerCase();
  const filters = {
    city: null,
    type: null,
    priceRange: { min: null, max: null },
    status: null,
    features: [],
    developer: null
  };

  // Extract Cities
  const cities = ['dubai', 'abu dhabi', 'sharjah', 'new cairo', '6th october', 'sheikh zayed', 'zayed'];
  cities.forEach(city => {
    if (lowerQuery.includes(city)) {
      filters.city = city === 'zayed' ? 'sheikh zayed' : city;
    }
  });

  // Extract Property Types
  const types = {
    'villa': 'villa',
    'villas': 'villa',
    'apartment': 'apartment',
    'apartments': 'apartment',
    'tower': 'tower',
    'towers': 'tower',
    'penthouse': 'penthouse',
    'townhouse': 'townhouse'
  };
  Object.keys(types).forEach(key => {
    if (lowerQuery.includes(key)) {
      filters.type = types[key];
    }
  });

  // Extract Price Range
  const priceMatch = lowerQuery.match(/under (\d+\.?\d*)m/i) || 
                     lowerQuery.match(/below (\d+\.?\d*)m/i) ||
                     lowerQuery.match(/less than (\d+\.?\d*)m/i);
  if (priceMatch) {
    filters.priceRange.max = parseFloat(priceMatch[1]) * 1000000;
  }

  const minPriceMatch = lowerQuery.match(/above (\d+\.?\d*)m/i) ||
                        lowerQuery.match(/over (\d+\.?\d*)m/i) ||
                        lowerQuery.match(/more than (\d+\.?\d*)m/i);
  if (minPriceMatch) {
    filters.priceRange.min = parseFloat(minPriceMatch[1]) * 1000000;
  }

  const rangeMatch = lowerQuery.match(/(\d+\.?\d*)m?\s*-\s*(\d+\.?\d*)m/i);
  if (rangeMatch) {
    filters.priceRange.min = parseFloat(rangeMatch[1]) * 1000000;
    filters.priceRange.max = parseFloat(rangeMatch[2]) * 1000000;
  }

  // Extract Status
  if (lowerQuery.includes('under construction') || lowerQuery.includes('construction')) {
    filters.status = 'under-construction';
  } else if (lowerQuery.includes('completed') || lowerQuery.includes('ready')) {
    filters.status = 'completed';
  } else if (lowerQuery.includes('upcoming') || lowerQuery.includes('soon')) {
    filters.status = 'upcoming';
  }

  // Extract Features/Amenities
  const amenities = {
    'pool': 'Pool',
    'swimming': 'Pool',
    'gym': 'Gym',
    'fitness': 'Gym',
    'parking': 'Parking',
    'security': 'Security',
    'playground': 'Playground',
    'kids': 'Playground',
    'garden': 'Green Area',
    'green': 'Green Area',
    'park': 'Green Area'
  };
  Object.keys(amenities).forEach(key => {
    if (lowerQuery.includes(key) && !filters.features.includes(amenities[key])) {
      filters.features.push(amenities[key]);
    }
  });

  // Extract Luxury/Premium indicators
  if (lowerQuery.includes('luxury') || lowerQuery.includes('premium') || lowerQuery.includes('high-end')) {
    filters.category = 'luxury';
  }

  // Extract Developer (basic implementation)
  const developers = ['elite', 'emaar', 'damac', 'aldar', 'meraas'];
  developers.forEach(dev => {
    if (lowerQuery.includes(dev)) {
      filters.developer = dev;
    }
  });

  return filters;
};

/**
 * Apply parsed filters to projects array
 */
export const applyFilters = (projects, filters) => {
  return projects.filter(project => {
    // City filter
    if (filters.city && project.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    // Type filter
    if (filters.type && !project.name.toLowerCase().includes(filters.type)) {
      return false;
    }

    // Price filter
    if (filters.priceRange.max || filters.priceRange.min) {
      const projectPrice = parsePrice(project.price);
      if (filters.priceRange.max && projectPrice > filters.priceRange.max) {
        return false;
      }
      if (filters.priceRange.min && projectPrice < filters.priceRange.min) {
        return false;
      }
    }

    // Status filter
    if (filters.status && project.status !== filters.status) {
      return false;
    }

    // Features filter
    if (filters.features.length > 0) {
      const hasAllFeatures = filters.features.every(feature =>
        project.features.includes(feature)
      );
      if (!hasAllFeatures) {
        return false;
      }
    }

    // Developer filter
    if (filters.developer && 
        !project.developer.toLowerCase().includes(filters.developer.toLowerCase())) {
      return false;
    }

    return true;
  });
};

/**
 * Helper function to parse price string to number
 */
const parsePrice = (priceString) => {
  if (!priceString) return 0;
  
  const cleanPrice = priceString.replace(/[^0-9.]/g, '');
  let price = parseFloat(cleanPrice);
  
  if (priceString.toLowerCase().includes('m')) {
    price = price * 1000000;
  } else if (priceString.toLowerCase().includes('k')) {
    price = price * 1000;
  }
  
  return price;
};

/**
 * Generate human-readable description of filters
 */
export const describeFilters = (filters) => {
  const parts = [];

  if (filters.type) {
    parts.push(filters.type + 's');
  }

  if (filters.city) {
    parts.push('in ' + filters.city);
  }

  if (filters.priceRange.max && filters.priceRange.min) {
    parts.push(`between ${filters.priceRange.min / 1000000}M - ${filters.priceRange.max / 1000000}M`);
  } else if (filters.priceRange.max) {
    parts.push(`under ${filters.priceRange.max / 1000000}M`);
  } else if (filters.priceRange.min) {
    parts.push(`above ${filters.priceRange.min / 1000000}M`);
  }

  if (filters.status) {
    const statusLabels = {
      'under-construction': 'under construction',
      'completed': 'completed',
      'upcoming': 'upcoming'
    };
    parts.push(statusLabels[filters.status]);
  }

  if (filters.features.length > 0) {
    parts.push('with ' + filters.features.join(', '));
  }

  if (filters.developer) {
    parts.push('by ' + filters.developer);
  }

  return parts.length > 0 ? parts.join(' ') : 'all projects';
};

export default {
  parseQuery,
  applyFilters,
  describeFilters
};
