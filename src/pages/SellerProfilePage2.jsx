import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Upload,
  Camera,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  FileText,
  Image as ImageIcon,
  X,
  Settings,
  BarChart3,
  Users,
  Target,
  Award,
  Zap,
  AlertCircle,
  Phone,
  Mail,
  Shield,
  Search,
  Loader2,
} from "lucide-react";
import {
  createProperty,
  deleteProperty,
  getSellerProperties,
  updateProperty, // ✅ مهم
} from "../redux/slices/propertySlice";
import { Link } from "react-router-dom";

export default function SellerProfilePage2() {
  const dispatch = useDispatch();
  const { sellerProperties = [], loading = false } = useSelector(
    (state) => state.propertiesReducer || {}
  );

  const { user } = useSelector((state) => state.authReducer);

  // (removed unused activeTab state)
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  // Form state for new property
  const [formData, setFormData] = useState({
    title: "",
    type: "house",
    description: "",
    location: {
      city: "",
      area: "",
      nearBy: [],
    },
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    listingStatus: "sale",
    features: [],
    images: [], // array of image URLs (or file references if later implemented)
    documents: [],
    aiVerified: false,
    verifiedAt: "",
    seller: "",
    status: "available",
    isFeatured: false,
    termsAccepted: false,
  });
  const titleDeedRef = useRef(null);
  const floorPlanRef = useRef(null);
  // Local selected image files (from file picker)
  const [imageFiles, setImageFiles] = useState([]);
  const [documentsFiles, setDocumentsFiles] = useState({
    titleDeed: null,
    floorPlan: null,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0); // Index of the main image
  const [nearByInput, setNearByInput] = useState("");

  // Generate object URL previews for selected files and clean up
  useEffect(() => {
    if (!imageFiles || imageFiles.length === 0) {
      setImagePreviews([]);
      return;
    }
    const previews = imageFiles.map((f) => URL.createObjectURL(f));
    setImagePreviews(previews);
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p));
    };
  }, [imageFiles]);

  // ✅ Set selected image as main image
  const handleSetMainImage = (index) => {
    setImageFiles((prev) => {
      const updated = [...prev];
      const [mainImg] = updated.splice(index, 1); // شيل الصورة اللي اخترتها
      updated.unshift(mainImg); // خليها أول عنصر
      return updated;
    });
    setMainImageIndex(0); // الصورة الأولى دايمًا main
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    if (mainImageIndex >= newFiles.length) {
      setMainImageIndex(Math.max(0, newFiles.length - 1));
    } else if (index < mainImageIndex) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  // Load properties on mount
  useEffect(() => {
    dispatch(getSellerProperties());
  }, [dispatch]);

  // Calculate seller stats
  const activeListings = sellerProperties.filter(
    (p) => p.status === "sale" || p.status === "both"
  ).length;
  const totalViews = sellerProperties.reduce(
    (sum, p) => sum + (p.views || 0),
    0
  );
  const totalLikes = sellerProperties.reduce(
    (sum, p) => sum + (p.likes || 0),
    0
  );
  const totalInquiries = sellerProperties.reduce(
    (sum, p) => sum + (p.inquiries || 0),
    0
  );

  const sellerStats = [
    {
      label: "Active Listings",
      value: activeListings,
      icon: Building2,
      color: "from-blue-500 to-blue-700",
      change: "+2",
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "from-accent-gold to-yellow-600",
      change: "+15%",
    },
    {
      label: "Interested Buyers",
      value: totalInquiries,
      icon: Users,
      color: "from-green-500 to-green-700",
      change: "+5",
    },
    {
      label: "Total Likes",
      value: totalLikes,
      icon: Heart,
      color: "from-purple-500 to-purple-700",
      change: "+12",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "sale":
        return "bg-green-100 text-green-700 border-green-200";
      case "rent":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "both":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Filter and sort properties
  const filteredProperties = sellerProperties.filter((property) => {
    const matchesType = filterType === "all" || property.type === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      property.listingStatus === filterStatus ||
      (filterStatus === "both" && property.listingStatus === "both");
    const matchesSearch =
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.city
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      property.location?.area
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch && matchesStatus;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt || b.listedDate) -
          new Date(a.createdAt || a.listedDate)
        );
      case "oldest":
        return (
          new Date(a.createdAt || a.listedDate) -
          new Date(b.createdAt || b.listedDate)
        );
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "views":
        return (b.views || 0) - (a.views || 0);
      case "inquiries":
        return (b.inquiries || 0) - (a.inquiries || 0);
      default:
        return 0;
    }
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested location fields
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle feature checkbox
  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      type: "house",
      description: "",
      location: {
        city: "",
        area: "",
        nearBy: [],
      },
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      listingStatus: "sale",
      images: [],
      features: [],
      documents: [],
      aiVerified: false,
      verifiedAt: "",
      seller: "",
      status: "available",
      isFeatured: false,
      termsAccepted: false,
    });
    setUploadStep(1);
    setSubmitError("");
    setSubmitSuccess(false);
    setImageFiles([]);
    setImagePreviews([]);
    setMainImageIndex(0);
    setEditMode(false); // 🆕
    setEditingPropertyId(null); //
  };
  // 🆕 أضف هذه الدالة الكاملة بعد resetForm
  const handleEditProperty = (property) => {
    if (!property) {
      console.error("Property is missing", property);
      return;
    }

    // ✅ استخدم id أو _id حسب اللي موجود
    const propertyId = property._id || property.id;

    if (!propertyId) {
      console.error("Property ID is missing", property);
      return;
    }

    setEditMode(true);
    setEditingPropertyId(propertyId);

    setFormData({
      title: property.title || "",
      type: property.type || "house",
      description: property.description || "",
      location: {
        city: property.location?.city || "",
        area: property.location?.area || "",
        nearBy: property.location?.nearBy || [],
      },
      price: property.price || "",
      area: property.area || "",
      bedrooms: property.bedrooms || "",
      bathrooms: property.bathrooms || "",
      listingStatus: property.listingStatus || "sale",
      images: property.images || [],
      features: property.features || [],
      documents: property.documents || [],
      aiVerified: property.aiVerified || false,
      verifiedAt: property.verifiedAt || "",
      seller: property.seller || "",
      status: property.status || "available",
      isFeatured: property.isFeatured || false,
      termsAccepted: true,
    });

    setShowUploadModal(true);
    setUploadStep(1);
  };
  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!formData.title || !formData.location.city || !formData.price) {
      setSubmitError("الرجاء ملء جميع الحقول المطلوبة (Title, City, Price)");
      return;
    }

    if (!formData.termsAccepted) {
      setSubmitError("الرجاء الموافقة على الشروط والأحكام");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 🆕 فحص إذا كان وضع التعديل
      if (editMode) {
        // ✅ Update Mode
        if (imageFiles && imageFiles.length > 0) {
          const fd = new FormData();
          fd.append("title", formData.title);
          fd.append("type", formData.type);
          fd.append("description", formData.description);
          fd.append(
            "location",
            JSON.stringify({
              city: formData.location.city,
              area: formData.location.area,
              nearBy: formData.location.nearBy,
            })
          );
          fd.append("price", String(Number(formData.price)));
          fd.append("area", String(Number(formData.area || 0)));
          fd.append("bedrooms", String(Number(formData.bedrooms || 0)));
          fd.append("bathrooms", String(Number(formData.bathrooms || 0)));
          fd.append("listingStatus", formData.listingStatus);
          fd.append("status", formData.status || "available");
          fd.append("features", JSON.stringify(formData.features || []));
          fd.append("isFeatured", String(Boolean(formData.isFeatured)));
          fd.append("termsAccepted", String(Boolean(formData.termsAccepted)));
          fd.append("mainImageIndex", String(mainImageIndex));

          imageFiles.forEach((file) => fd.append("images", file));
          if (documentsFiles.titleDeed)
            fd.append("documents", documentsFiles.titleDeed);
          if (documentsFiles.floorPlan)
            fd.append("documents", documentsFiles.floorPlan);

          await dispatch(
            updateProperty({ id: editingPropertyId, updatedData: fd })
          ).unwrap();
        } else {
          // Update without new images
          const propertyData = {
            title: formData.title,
            type: formData.type,
            description: formData.description,
            location: {
              city: formData.location.city,
              area: formData.location.area,
              nearBy: formData.location.nearBy,
            },
            price: Number(formData.price),
            area: Number(formData.area),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            listingStatus: formData.listingStatus,
            status: formData.status || "available",
            images: formData.images,
            features: formData.features,
            isFeatured: formData.isFeatured,
            termsAccepted: formData.termsAccepted,
          };

          await dispatch(
            updateProperty({ id: editingPropertyId, updatedData: propertyData })
          ).unwrap();
        }
      } else {
        // ✅ Create Mode (الكود الأصلي)
        if (imageFiles && imageFiles.length > 0) {
          const fd = new FormData();
          fd.append("title", formData.title);
          fd.append("type", formData.type);
          fd.append("description", formData.description);
          fd.append(
            "location",
            JSON.stringify({
              city: formData.location.city,
              area: formData.location.area,
              nearBy: formData.location.nearBy,
            })
          );
          fd.append("price", String(Number(formData.price)));
          fd.append("area", String(Number(formData.area || 0)));
          fd.append("bedrooms", String(Number(formData.bedrooms || 0)));
          fd.append("bathrooms", String(Number(formData.bathrooms || 0)));
          fd.append("listingStatus", formData.listingStatus);
          fd.append("status", formData.status || "available");
          fd.append("documents", JSON.stringify(formData.documents || []));
          fd.append("aiVerified", String(Boolean(formData.aiVerified)));
          fd.append("verifiedAt", formData.verifiedAt || "");
          fd.append("seller", formData.seller || "");
          fd.append("features", JSON.stringify(formData.features || []));
          fd.append("isFeatured", String(Boolean(formData.isFeatured)));
          fd.append("termsAccepted", String(Boolean(formData.termsAccepted)));
          fd.append("mainImageIndex", String(mainImageIndex));

          imageFiles.forEach((file) => fd.append("images", file));
          if (documentsFiles.titleDeed)
            fd.append("documents", documentsFiles.titleDeed);
          if (documentsFiles.floorPlan)
            fd.append("documents", documentsFiles.floorPlan);

          await dispatch(createProperty(fd)).unwrap();
        } else {
          if (!Array.isArray(formData.images) || formData.images.length === 0) {
            setSubmitError("الرجاء إضافة صورة واحدة على الأقل أو رفع ملف صورة");
            setIsSubmitting(false);
            return;
          }

          const propertyData = {
            title: formData.title,
            type: formData.type,
            description: formData.description,
            location: {
              city: formData.location.city,
              area: formData.location.area,
              nearBy: formData.location.nearBy,
            },
            price: Number(formData.price),
            area: Number(formData.area),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            listingStatus: formData.listingStatus,
            status: formData.status || "available",
            images: formData.images,
            features: formData.features,
            documents: formData.documents || [],
            aiVerified: Boolean(formData.aiVerified),
            verifiedAt: formData.verifiedAt || "",
            seller: formData.seller || "",
            isFeatured: formData.isFeatured,
            termsAccepted: formData.termsAccepted,
          };

          await dispatch(createProperty(propertyData)).unwrap();
        }
      }

      // Success
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowUploadModal(false);
        resetForm();
        dispatch(getSellerProperties());
      }, 1500);
    } catch (error) {
      setSubmitError(
        error.message ||
          (editMode
            ? "حدث خطأ أثناء تحديث العقار"
            : "حدث خطأ أثناء إضافة العقار")
      );
      console.error("Error saving property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const propertyFeatures = [
    "Swimming Pool",
    "Garden",
    "Parking",
    "Security System",
    "Gym/Fitness Center",
    "Elevator",
    "Balcony/Terrace",
    "Central AC",
    "Furnished",
    "Pet Friendly",
    "Smart Home",
    "Storage Room",
    "Fireplace",
    "Walk-in Closet",
    "Ocean View",
    "City View",
  ];
  const handleDelete = (id) => {
    setPropertyToDelete(id); // خزن الـ id
    setShowDeleteModal(true); // افتح المودال
  };
  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    try {
      await dispatch(deleteProperty(propertyToDelete)).unwrap();
      console.log("✅ Property deleted successfully");
    } catch (err) {
      console.error("❌ Failed to delete property:", err);
    } finally {
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-inter">
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Confirm Deletion
            </h2>
            <p className="mb-6">
              Are you sure you want to delete this property?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-navy via-blue-900 to-primary-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold to-yellow-600 rounded-full blur opacity-75"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-full flex items-center justify-center text-4xl font-bold text-primary-navy">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4 text-primary-navy" />
                </button>
              </div>

              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-playfair text-3xl font-bold">
                    {" "}
                    {user?.name || "Seller"}
                  </h1>
                  {user?.role === "seller" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-gold/20 border border-accent-gold/30 rounded-full text-accent-gold text-sm font-semibold">
                      <Shield className="w-3 h-3" />
                      Verified Seller
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {user?.email || "example@email.com"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {user?.phone || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300 flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="px-6 py-3 bg-accent-gold hover:bg-yellow-500 text-primary-navy font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellerStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-accent-gold/30 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <div className="font-playfair text-3xl font-bold text-primary-navy mb-1">
                {stat.value}
              </div>
              <div className="text-text-light text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Properties List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header with Add Button */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h2 className="font-playfair text-2xl font-bold text-primary-navy">
                    My Properties ({sellerProperties.length})
                  </h2>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="group px-6 py-3 bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-600 hover:to-accent-gold text-primary-navy font-semibold rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add Property
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                      <input
                        type="text"
                        placeholder="Search by title or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      >
                        <option value="all">All Types</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="house">House</option>
                      </select>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      >
                        <option value="all">All Status</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                        <option value="both">Sale & Rent</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-light">
                      Showing {sortedProperties.length} of{" "}
                      {sellerProperties.length} properties
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all text-sm"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="views">Most Viewed</option>
                      <option value="inquiries">Most Inquiries</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <Loader2 className="w-12 h-12 text-accent-gold mx-auto mb-4 animate-spin" />
                <p className="text-text-light">Loading properties...</p>
              </div>
            )}

            {/* Properties Grid */}
            {!loading && sortedProperties.length > 0 ? (
              <div className="space-y-6">
                {sortedProperties.map((property) => (
                  <div
                    key={property.id || property._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-accent-gold/30"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Property Image */}
                      <div className="relative md:w-64 h-64 md:h-auto overflow-hidden bg-slate-200">
                        {property.image || property.images?.[0] ? (
                          <img
                            src={property.image || property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-16 h-16 text-slate-400" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              property.listingStatus
                            )}`}
                          >
                            {property.listingStatus === "both"
                              ? "SALE/RENT"
                              : property.listingStatus?.toUpperCase()}
                          </span>
                          {property.isFeatured && (
                            <span className="px-3 py-1 bg-accent-gold text-primary-navy rounded-full text-xs font-semibold flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <button
                            onClick={() => handleEditProperty(property)}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <Edit className="w-4 h-4 text-primary-navy" />
                          </button>
                          <button
                            onClick={() => handleDelete(property._id)}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                          <Link
                            to={"/details"}
                            state={ property }
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-blue-50 shadow-lg"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </Link>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-playfair text-2xl font-bold text-primary-navy group-hover:text-accent-gold transition-colors">
                            {property.title}
                          </h3>
                          <span className="text-xs text-text-light capitalize px-2 py-1 bg-slate-100 rounded">
                            {property.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-text-light mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {property.location?.city}
                            {property.location?.area &&
                              `, ${property.location.area}`}
                          </span>
                        </div>

                        <p className="text-text-light text-sm mb-4 line-clamp-2">
                          {property.description}
                        </p>

                        <div className="flex items-center gap-6 mb-4 text-text-dark">
                          <span className="flex items-center gap-2">
                            <Bed className="w-5 h-5 text-primary-navy" />
                            {property.bedrooms} Beds
                          </span>
                          <span className="flex items-center gap-2">
                            <Bath className="w-5 h-5 text-primary-navy" />
                            {property.bathrooms} Baths
                          </span>
                          <span className="flex items-center gap-2">
                            <Maximize className="w-5 h-5 text-primary-navy" />
                            {property.area.toLocaleString()} sqft
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <div className="font-playfair text-3xl font-bold text-primary-navy">
                              ${property.price?.toLocaleString()}
                            </div>
                            <div className="text-sm text-text-light flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Listed{" "}
                              {new Date(
                                property.createdAt || property.listedDate
                              ).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-primary-navy font-semibold">
                                <Eye className="w-4 h-4" />
                                {property.views || 0}
                              </div>
                              <div className="text-xs text-text-light">
                                Views
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-red-600 font-semibold">
                                <Heart className="w-4 h-4" />
                                {property.likes || 0}
                              </div>
                              <div className="text-xs text-text-light">
                                Likes
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-green-600 font-semibold">
                                <MessageSquare className="w-4 h-4" />
                                {property.inquiries || 0}
                              </div>
                              <div className="text-xs text-text-light">
                                Inquiries
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl font-bold text-primary-navy mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-text-light mb-6">
                    {sellerProperties.length === 0
                      ? "Start by adding your first property"
                      : "Try adjusting your filters"}
                  </p>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="px-6 py-3 bg-accent-gold text-primary-navy rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
                  >
                    Add Property
                  </button>
                </div>
              )
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary-navy to-blue-900 rounded-2xl p-6 shadow-xl text-white">
              <h3 className="font-playfair text-2xl font-bold mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-left flex items-center gap-3 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <Target className="w-5 h-5 text-accent-gold" />
                  <span>View AI Recommendations</span>
                </button>
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-left flex items-center gap-3 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <Users className="w-5 h-5 text-accent-gold" />
                  <span>Check Buyer Matches</span>
                </button>
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-left flex items-center gap-3 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <TrendingUp className="w-5 h-5 text-accent-gold" />
                  <span>Market Analysis</span>
                </button>
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-left flex items-center gap-3 transition-all duration-300 border border-white/20 hover:border-white/40">
                  <BarChart3 className="w-5 h-5 text-accent-gold" />
                  <span>View Full Reports</span>
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-accent-gold/10 to-yellow-100/50 rounded-2xl p-6 border border-accent-gold/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-accent-gold rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-navy" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-primary-navy">
                  AI Insight
                </h3>
              </div>
              <p className="text-text-dark leading-relaxed mb-3">
                Properties in your area are getting 45% more inquiries this
                week. Consider updating your listings with fresh photos!
              </p>
              <button className="text-accent-gold hover:text-yellow-600 text-sm font-semibold flex items-center gap-1">
                Learn More <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Property Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-navy to-blue-900 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="font-playfair text-3xl font-bold text-white mb-2">
                  {editMode ? "Edit Property" : "Add New Property"}
                </h2>
                <p className="text-blue-100">Step {uploadStep} of 3</p>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  resetForm();
                }}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-6">
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        step <= uploadStep ? "bg-accent-gold" : "bg-slate-200"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700 font-semibold">
                  {editMode
                    ? "تم تحديث العقار بنجاح!"
                    : "تم إضافة العقار بنجاح!"}
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700">{submitError}</p>
              </div>
            )}

            {/* Step 1: Basic Info */}
            {uploadStep === 1 && (
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Property Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Modern Luxury Villa"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Property Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                    >
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Austin"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Area / Neighborhood
                    </label>
                    <input
                      type="text"
                      name="location.area"
                      value={formData.location.area}
                      onChange={handleInputChange}
                      placeholder="e.g., Travis Heights"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Nearby Places
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={nearByInput}
                        onChange={(e) => setNearByInput(e.target.value)}
                        placeholder="Add nearby place"
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!nearByInput) return;
                          setFormData((prev) => ({
                            ...prev,
                            location: {
                              ...prev.location,
                              nearBy: [...prev.location.nearBy, nearByInput],
                            },
                          }));
                          setNearByInput("");
                        }}
                        className="px-4 py-3 bg-accent-gold hover:bg-yellow-500 text-primary-navy rounded-lg"
                      >
                        Add
                      </button>
                    </div>

                    {/* List of added nearby places */}
                    <ul className="mt-2 space-y-1">
                      {formData.location.nearBy.map((place, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center bg-slate-100 px-3 py-1 rounded-lg"
                        >
                          <span>{place}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                location: {
                                  ...prev.location,
                                  nearBy: prev.location.nearBy.filter(
                                    (_, i) => i !== idx
                                  ),
                                },
                              }))
                            }
                            className="text-red-500 font-bold"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="750000"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Area (sqft) *
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="2000"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      placeholder="4"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="3"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-navy mb-2">
                      Listing Status *
                    </label>
                    <select
                      name="listingStatus"
                      value={formData.listingStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-navy mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe your property in detail..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    AI will analyze your property details and suggest optimal
                    pricing based on market trends.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {uploadStep === 2 && (
              <div className="p-6 space-y-6">
                <div className="border-2 border-dashed border-accent-gold/30 rounded-2xl p-6 hover:border-accent-gold/60 transition-colors bg-accent-gold/5">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-full flex items-center justify-center">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-playfair text-2xl font-bold text-primary-navy mb-2">
                        Upload Property Photos
                      </h3>
                      <p className="text-text-light mb-4">
                        Select multiple images at once. The first image will be
                        marked as the main image by default, but you can change
                        it later.
                      </p>

                      {/* Custom Upload Button */}
                      <div className="mb-6">
                        <label
                          htmlFor="image-upload"
                          className="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-600 hover:to-accent-gold text-primary-navy font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                          <ImageIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          <span>Choose Images</span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              setImageFiles((prev) => [...prev, ...files]);
                              if (
                                files.length > 0 &&
                                mainImageIndex >= files.length
                              ) {
                                setMainImageIndex(0);
                              }

                              // ✅ Reset input value so user can re-upload the same file later
                              e.target.value = null;
                            }}
                            className="hidden"
                          />
                        </label>
                        <p className="text-sm text-text-light mt-2">
                          Select multiple images (max 20). Supported formats:
                          JPG, PNG, GIF
                        </p>
                      </div>

                      {/* Image Previews with Main Image Selection */}
                      {imageFiles.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-primary-navy">
                            Selected Images ({imageFiles.length})
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {imageFiles.map((file, index) => (
                              <div
                                key={file.name + index}
                                className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                  index === mainImageIndex
                                    ? "border-accent-gold shadow-lg ring-2 ring-accent-gold/30"
                                    : "border-slate-200 hover:border-accent-gold/50"
                                }`}
                              >
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                                {/* Main Image Badge */}
                                {index === mainImageIndex && (
                                  <div className="absolute top-2 left-2 bg-accent-gold text-primary-navy px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Main
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {index !== mainImageIndex && (
                                    <button
                                      onClick={() => handleSetMainImage(index)}
                                      className="w-8 h-8 bg-accent-gold hover:bg-yellow-500 text-primary-navy rounded-full flex items-center justify-center shadow-lg transition-colors"
                                      title="Set as main image"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                                    title="Remove image"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                {/* File Name */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                  <p className="text-white text-xs truncate">
                                    {file.name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {imageFiles.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-text-light">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>
                                Main image:{" "}
                                <strong>
                                  {imageFiles[mainImageIndex]?.name}
                                </strong>
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <p className="text-sm text-text-light mt-3">
                        Maximum 20 photos. The server requires at least one
                        image. The main image will be displayed on property
                        cards.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 font-semibold mb-1">
                      Pro Tip from AI
                    </p>
                    <p className="text-sm text-blue-700">
                      Properties with high-quality photos get 3x more views.
                      Choose a beautiful exterior shot as your main image.
                      Include outdoor shots, living areas, and key features.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Features */}
            {uploadStep === 3 && (
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Title Deed */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-accent-gold/60 transition-colors cursor-pointer">
                    <FileText className="w-12 h-12 text-accent-gold mx-auto mb-3" />
                    <h4 className="font-semibold text-primary-navy mb-2">
                      Title Deed
                    </h4>
                    <p className="text-sm text-text-light mb-3">
                      Upload property ownership document
                    </p>
                    <input
                      type="file"
                      ref={titleDeedRef}
                      onChange={(e) =>
                        setDocumentsFiles((prev) => ({
                          ...prev,
                          titleDeed: e.target.files[0] || null,
                        }))
                      }
                      className="hidden"
                      id="titleDeedInput"
                    />
                    <label
                      htmlFor="titleDeedInput"
                      className="text-accent-gold hover:text-yellow-600 text-sm font-semibold cursor-pointer"
                    >
                      Choose File
                    </label>

                    {documentsFiles.titleDeed && (
                      <div className="mt-3 flex items-center justify-between bg-slate-100 px-4 py-2 rounded-lg text-sm text-text-dark">
                        <span>{documentsFiles.titleDeed.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setDocumentsFiles((prev) => ({
                              ...prev,
                              titleDeed: null,
                            }));
                            if (titleDeedRef.current)
                              titleDeedRef.current.value = "";
                          }}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Floor Plan */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-accent-gold/60 transition-colors cursor-pointer">
                    <FileText className="w-12 h-12 text-accent-gold mx-auto mb-3" />
                    <h4 className="font-semibold text-primary-navy mb-2">
                      Floor Plan
                    </h4>
                    <p className="text-sm text-text-light mb-3">
                      Upload property blueprint (optional)
                    </p>
                    <input
                      type="file"
                      ref={floorPlanRef}
                      onChange={(e) =>
                        setDocumentsFiles((prev) => ({
                          ...prev,
                          floorPlan: e.target.files[0] || null,
                        }))
                      }
                      className="hidden"
                      id="floorPlanInput"
                    />
                    <label
                      htmlFor="floorPlanInput"
                      className="text-accent-gold hover:text-yellow-600 text-sm font-semibold cursor-pointer"
                    >
                      Choose File
                    </label>

                    {documentsFiles.floorPlan && (
                      <div className="mt-3 flex items-center justify-between bg-slate-100 px-4 py-2 rounded-lg text-sm text-text-dark">
                        <span>{documentsFiles.floorPlan.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setDocumentsFiles((prev) => ({
                              ...prev,
                              floorPlan: null,
                            }));
                            if (floorPlanRef.current)
                              floorPlanRef.current.value = "";
                          }}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                  <h4 className="font-playfair text-xl font-bold text-primary-navy mb-4">
                    Property Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {propertyFeatures.map((feature, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="w-5 h-5 text-accent-gold rounded focus:ring-accent-gold"
                        />
                        <span className="text-text-dark">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-accent-gold rounded focus:ring-accent-gold"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm text-text-dark font-semibold flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-accent-gold" />
                    Mark as Featured Property (Additional $50/month)
                  </label>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <input
                    type="checkbox"
                    id="terms"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-accent-gold rounded focus:ring-accent-gold"
                  />
                  <label htmlFor="terms" className="text-sm text-text-dark">
                    I confirm that all information provided is accurate and I
                    have the legal right to list this property for sale/rent *
                  </label>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">
                        AI Verification Process
                      </h4>
                      <p className="text-sm text-green-700 leading-relaxed">
                        Our AI will automatically verify your details, check
                        property data against market trends, and suggest optimal
                        pricing. This usually takes 2-5 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex items-center justify-between">
              <button
                onClick={() => setUploadStep(Math.max(1, uploadStep - 1))}
                disabled={uploadStep === 1 || isSubmitting}
                className="px-6 py-3 border-2 border-slate-300 text-text-dark font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    resetForm();
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-3 text-text-light hover:text-text-dark font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                {uploadStep < 3 ? (
                  <button
                    onClick={() => setUploadStep(uploadStep + 1)}
                    disabled={isSubmitting}
                    className="group px-8 py-3 bg-accent-gold hover:bg-yellow-500 text-primary-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                  >
                    Continue
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {editMode ? "Updating..." : "Publishing..."}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        {editMode ? "Update Property" : "Publish Property"}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
