import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload } from "react-icons/fa";
import {
  createProperty,
  getSellerProperties,
  updateProperty,
} from "../../redux/slices/propertySlice";
import { useState, useEffect } from "react";

const AddProjectForm = ({ isOpen, onClose, editingProject }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    city: "",
    area: "",
    description: "",
    price: "",
    units: "",
    completionPercentage: "",
    status: "under-construction",
    nearBy: "",
    features: "",
    developerLogo: "",
    developerLocation: "",
    totalProjects: "",
    developerPhone: "",
    developerEmail: "",
    developerWebsite: "",
    developerDescription: "",
    images: [],
    oldImages: [],
  });

  const [dragActive, setDragActive] = useState(false);

useEffect(() => {
  if (editingProject) {
    // 🟡 Edit Mode
    setFormData({
      projectName: editingProject.projectName || "",
      city: editingProject.location?.city || "",
      area: editingProject.location?.area || "",
      description: editingProject.description || "",
      price: editingProject.price || "",
      units: editingProject.units || "",
      completionPercentage: editingProject.completionPercentage || "",
      status: editingProject.status || "under-construction",
      nearBy: editingProject.location?.nearBy?.join(", ") || "",
      features: editingProject.features?.join(", ") || "",
      developerLogo: editingProject.developerInfo?.logo || "",
      developerLocation: editingProject.developerInfo?.location || "",
      totalProjects: editingProject.developerInfo?.totalProjects || "",
      developerPhone: editingProject.developerInfo?.phone || "",
      developerEmail: editingProject.developerInfo?.email || "",
      developerWebsite: editingProject.developerInfo?.website || "",
      developerDescription: editingProject.developerInfo?.description || "",
      images: [],
      oldImages: editingProject.images || [],
    });
  } else {
    // 🟢 Add Mode — Reset form
    setFormData({
      projectName: "",
      city: "",
      area: "",
      description: "",
      price: "",
      units: "",
      completionPercentage: "",
      status: "under-construction",
      nearBy: "",
      features: "",
      developerLogo: "",
      developerLocation: "",
      totalProjects: "",
      developerPhone: "",
      developerEmail: "",
      developerWebsite: "",
      developerDescription: "",
      images: [],
      oldImages: [],
    });
  }
  // 🧹 Clean old messages every time mode changes
  setErrorMessage("");
  setSuccessMessage("");
}, [editingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) handleFiles(e.target.files);
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...fileArray.slice(0, 5 - prev.images.length)],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeOldImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      oldImages: prev.oldImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (editingProject) {
        // ==================== Edit Mode ====================
        const jsonData = {
          type: "project",
          projectName: formData.projectName,
          description: formData.description,
          price: Number(formData.price),
          units: Number(formData.units),
          completionPercentage: Number(formData.completionPercentage),
          status: formData.status,
          termsAccepted: true,
          location: {
            city: formData.city,
            area: formData.area,
            nearBy: formData.nearBy
              ? formData.nearBy.split(",").map((i) => i.trim())
              : [],
          },
          features: formData.features
            ? formData.features.split(",").map((i) => i.trim())
            : [],
          developerInfo: {
            logo: formData.developerLogo || undefined,
            location: formData.developerLocation || undefined,
            totalProjects: formData.totalProjects
              ? Number(formData.totalProjects)
              : undefined,
            phone: formData.developerPhone || undefined,
            email: formData.developerEmail || undefined,
            website: formData.developerWebsite || undefined,
            description: formData.developerDescription || undefined,
          },
          existingImages: formData.oldImages,
        };

        if (formData.images.length > 0) {
          const fd = new FormData();
          Object.keys(jsonData).forEach((key) => {
            if (typeof jsonData[key] === "object" && jsonData[key] !== null) {
              fd.append(key, JSON.stringify(jsonData[key]));
            } else {
              fd.append(key, jsonData[key]);
            }
          });
          formData.images.forEach((file) => fd.append("images", file));

          await dispatch(
            updateProperty({ id: editingProject._id, updatedData: fd })
          ).unwrap();
        } else {
          await dispatch(
            updateProperty({ id: editingProject._id, updatedData: jsonData })
          ).unwrap();
        }

        setSuccessMessage("تم تحديث المشروع بنجاح ✅");
      } else {
        // ==================== Create Mode ====================
        const fd = new FormData();
        fd.append("type", "project");
        fd.append("projectName", formData.projectName);
        fd.append("description", formData.description);
        fd.append("price", Number(formData.price));
        fd.append("units", Number(formData.units));
        fd.append(
          "completionPercentage",
          Number(formData.completionPercentage)
        );
        fd.append("status", formData.status);
        fd.append("termsAccepted", true);

        fd.append(
          "location",
          JSON.stringify({
            city: formData.city,
            area: formData.area,
            nearBy: formData.nearBy
              ? formData.nearBy.split(",").map((i) => i.trim())
              : [],
          })
        );

        fd.append(
          "features",
          JSON.stringify(
            formData.features
              ? formData.features.split(",").map((i) => i.trim())
              : []
          )
        );

        fd.append(
          "developerInfo",
          JSON.stringify({
            logo: formData.developerLogo || undefined,
            location: formData.developerLocation || undefined,
            totalProjects: formData.totalProjects
              ? Number(formData.totalProjects)
              : undefined,
            phone: formData.developerPhone || undefined,
            email: formData.developerEmail || undefined,
            website: formData.developerWebsite || undefined,
            description: formData.developerDescription || undefined,
          })
        );

        formData.images.forEach((file) => fd.append("images", file));

        await dispatch(createProperty(fd)).unwrap();
        setSuccessMessage("تم إنشاء المشروع بنجاح ✅");
      }

      await dispatch(getSellerProperties()).unwrap();

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
        setFormData({
          projectName: "",
          city: "",
          area: "",
          description: "",
          price: "",
          units: "",
          completionPercentage: "",
          status: "under-construction",
          nearBy: "",
          features: "",
          developerLogo: "",
          developerLocation: "",
          totalProjects: "",
          developerPhone: "",
          developerEmail: "",
          developerWebsite: "",
          developerDescription: "",
          images: [],
          oldImages: [],
        });
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error?.message || "حدث خطأ. حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-border-light px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
              <h2 className="text-2xl font-bold text-text-dark">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-light-gray rounded-full transition-colors"
              >
                <FaTimes className="text-text-light text-xl" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {errorMessage && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg">
                  {successMessage}
                </div>
              )}

              {/* Project Name */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                  placeholder="e.g., Marina Bay Residences"
                />
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                    placeholder="e.g., Dubai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    Area *
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                    placeholder="e.g., Dubai Marina"
                  />
                </div>
              </div>

              {/* Price and Units */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                    placeholder="e.g., 1800000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    Units Count *
                  </label>
                  <input
                    type="number"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                    placeholder="e.g., 45"
                  />
                </div>
              </div>

              {/* Completion and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    Completion % *
                  </label>
                  <input
                    type="number"
                    name="completionPercentage"
                    value={formData.completionPercentage}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                    placeholder="e.g., 75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                  >
                    <option value="under-construction">
                      Under Construction
                    </option>
                    <option value="completed">Completed</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              {/* Near By and Features */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    Near By (comma separated)
                  </label>
                  <input
                    type="text"
                    name="nearBy"
                    value={formData.nearBy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                    placeholder="e.g., Mall, Metro, Beach"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-dark mb-2">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                    placeholder="e.g., Security, Pool, Gym"
                  />
                </div>
              </div>

              {/* Developer Info */}
              <div className="border-t border-border-light pt-6">
                <h3 className="text-lg font-bold text-text-dark mb-4">
                  Developer Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Developer Logo URL
                      </label>
                      <input
                        type="url"
                        name="developerLogo"
                        value={formData.developerLogo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Developer Location
                      </label>
                      <input
                        type="text"
                        name="developerLocation"
                        value={formData.developerLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="e.g., Dubai, UAE"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Total Projects
                      </label>
                      <input
                        type="number"
                        name="totalProjects"
                        value={formData.totalProjects}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="e.g., 18"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="developerPhone"
                        value={formData.developerPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="developerEmail"
                        value={formData.developerEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="info@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="developerWebsite"
                        value={formData.developerWebsite}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        name="developerDescription"
                        value={formData.developerDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="Short description..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              {/* Image Upload */}
              <div className="border-t border-border-light pt-6">
                <h3 className="text-lg font-bold text-text-dark mb-4">
                  Project Images
                </h3>

                {/* Upload Button */}
                <div
                  className={`mb-6 relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive
                      ? "border-accent-gold bg-light-gold"
                      : "border-border-light hover:border-accent-gold"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <FaUpload className="mx-auto text-4xl text-accent-gold mb-3" />
                    <p className="text-text-dark font-medium mb-1">
                      {editingProject
                        ? "Add More Images"
                        : " Drag and drop images here"}
                    </p>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-text-light mt-2">
                    Select multiple images (min 5). Supported formats: JPG, PNG,
                    GIF
                  </p>
                </div>

                {/* Existing Images (Old) */}
                {formData.oldImages.length > 0 && (
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-text-dark flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        Existing
                      </span>
                      Current Images ({formData.oldImages.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {formData.oldImages.map((imageUrl, index) => (
                        <div
                          key={imageUrl} // استخدم imageUrl كـ key
                          className="relative group rounded-xl overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all duration-300"
                        >
                          <img
                            src={imageUrl}
                            alt={`Existing ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                          {/* Existing Badge */}
                          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Existing
                          </div>

                          {/* Remove Button */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeOldImage(index)}
                              className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                              title="Remove image"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images */}
                {formData.images.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-dark flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        New
                      </span>
                      New Images ({formData.images.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {formData.images.map((file, index) => (
                        <div
                          key={file.name + file.lastModified + index} // key فريد
                          className="relative group rounded-xl overflow-hidden border-2 border-green-200 hover:border-green-400 transition-all duration-300"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                          {/* New Badge */}
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            New
                          </div>

                          {/* Remove Button */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                              title="Remove image"
                            >
                              <FaTimes className="w-3 h-3" />
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
                  </div>
                )}

                {/* Total Count */}
                <p className="text-sm text-text-light mt-3">
                  {editingProject
                    ? `Total images: ${
                        formData.oldImages.length + formData.images.length
                      } (Max 10)`
                    : "Minimum 5 photos required."}
                </p>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-border-light text-text-dark rounded-lg font-semibold hover:bg-light-gray transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-accent-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? "Processing..."
                    : editingProject
                    ? "Update Project"
                    : "Add Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddProjectForm;
