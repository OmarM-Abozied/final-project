import { useDispatch } from "react-redux"; // 👈 أضف دي
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload, FaImage } from "react-icons/fa";
import {
  createProperty,
  getSellerProperties,
  updateProperty,
} from "../../redux/slices/propertySlice";
import { useState, useEffect } from "react"; // 👈 أضف useEffect
const AddProjectForm = ({ isOpen, onClose, editingProject }) => {
  const dispatch = useDispatch(); // 👈 أضف دي
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 👈 إضافة جديدة
  const [successMessage, setSuccessMessage] = useState(""); // ✅ إضافة جديدة

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
  });
  // 👇 أضف useEffect دي عشان تملا الفورم لما تيجي بيانات Edit
  useEffect(() => {
    if (editingProject) {
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
        images: [], // الصور القديمة مش هنحملها في الـ input
      });
    }
  }, [editingProject]);

  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
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
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // مسح الأخطاء القديمة

    try {
      if (editingProject) {
        // ==================== Edit Mode ====================
        console.log("Editing Project:", editingProject._id);

        // تحضير JSON Object للـ Update
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
              ? formData.nearBy.split(",").map((item) => item.trim())
              : [],
          },
          features: formData.features
            ? formData.features.split(",").map((item) => item.trim())
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
        };

        // إذا في صور جديدة، استخدم FormData
        if (formData.images.length > 0) {
          const updateFormData = new FormData();

          // إضافة كل البيانات للـ FormData
          Object.keys(jsonData).forEach((key) => {
            if (typeof jsonData[key] === "object" && jsonData[key] !== null) {
              updateFormData.append(key, JSON.stringify(jsonData[key]));
            } else {
              updateFormData.append(key, jsonData[key]);
            }
          });

          // إضافة الصور
          formData.images.forEach((file) => {
            updateFormData.append("images", file);
          });

          await dispatch(
            updateProperty({
              id: editingProject._id,
              updatedData: updateFormData,
            })
          ).unwrap();
        } else {
          // بدون صور جديدة، استخدم JSON
          await dispatch(
            updateProperty({
              id: editingProject._id,
              updatedData: jsonData,
            })
          ).unwrap();
        }

        setSuccessMessage("تم تحديث المشروع بنجاح ✅");
      } else {
        // ==================== Create Mode ====================
        const formDataToSend = new FormData();

        // إضافة الحقول الأساسية
        formDataToSend.append("type", "project");
        formDataToSend.append("projectName", formData.projectName);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", Number(formData.price));
        formDataToSend.append("units", Number(formData.units));
        formDataToSend.append(
          "completionPercentage",
          Number(formData.completionPercentage)
        );
        formDataToSend.append("status", formData.status);
        formDataToSend.append("termsAccepted", true);

        // إضافة Location
        formDataToSend.append("location[city]", formData.city);
        formDataToSend.append("location[area]", formData.area);

        // معالجة nearBy
        if (formData.nearBy) {
          const nearByArray = formData.nearBy
            .split(",")
            .map((item) => item.trim());
          nearByArray.forEach((item, index) => {
            formDataToSend.append(`location[nearBy][${index}]`, item);
          });
        }

        // معالجة Features
        if (formData.features) {
          const featuresArray = formData.features
            .split(",")
            .map((item) => item.trim());
          featuresArray.forEach((item, index) => {
            formDataToSend.append(`features[${index}]`, item);
          });
        }

        // إضافة Developer Info
        if (formData.developerLogo) {
          formDataToSend.append("developerInfo[logo]", formData.developerLogo);
        }
        if (formData.developerLocation) {
          formDataToSend.append(
            "developerInfo[location]",
            formData.developerLocation
          );
        }
        if (formData.totalProjects) {
          formDataToSend.append(
            "developerInfo[totalProjects]",
            Number(formData.totalProjects)
          );
        }
        if (formData.developerPhone) {
          formDataToSend.append(
            "developerInfo[phone]",
            formData.developerPhone
          );
        }
        if (formData.developerEmail) {
          formDataToSend.append(
            "developerInfo[email]",
            formData.developerEmail
          );
        }
        if (formData.developerWebsite) {
          formDataToSend.append(
            "developerInfo[website]",
            formData.developerWebsite
          );
        }
        if (formData.developerDescription) {
          formDataToSend.append(
            "developerInfo[description]",
            formData.developerDescription
          );
        }

        // إضافة الصور
        formData.images.forEach((file) => {
          formDataToSend.append("images", file);
        });

        await dispatch(createProperty(formDataToSend)).unwrap();
        setSuccessMessage("تم إنشاء المشروع بنجاح ✅");
      }

      // ✅ تحديث القائمة
      // ✅ تحديث القائمة وانتظر لحد ما تخلص
      await dispatch(getSellerProperties()).unwrap();
      // ✅ إغلاق النافذة بعد 1.5 ثانية
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
        // Reset
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
        });
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error?.message || "حدث خطأ. حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 },
    },
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
              </div>
              {/* Units Count */}
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

              {/* Completion Percentage and Status */}
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
              {/* Developer Info Section */}
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
                        placeholder="+971..."
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
                        placeholder="info@..."
                      />
                    </div>
                  </div>

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
                      Developer Description
                    </label>
                    <textarea
                      name="developerDescription"
                      value={formData.developerDescription}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border border-border-light focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-none"
                      placeholder="About the developer..."
                    />
                  </div>
                </div>
              </div>
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  Upload Images (Max 5)
                </label>

                {/* Drag and Drop Zone */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive
                      ? "border-accent-gold bg-light-gold"
                      : "border-border-light hover:border-accent-gold"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <FaUpload className="mx-auto text-4xl text-accent-gold mb-3" />
                  <p className="text-text-dark font-medium mb-1">
                    Drag and drop images here
                  </p>
                  <p className="text-text-light text-sm mb-3">or</p>
                  <label
                    htmlFor="fileInput"
                    className="inline-block px-6 py-2 bg-accent-gold text-white rounded-lg cursor-pointer hover:bg-opacity-90 transition-all"
                  >
                    Browse Files
                  </label>
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-border-light"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                    ? editingProject
                      ? "جاري التحديث..."
                      : "جاري الإرسال..."
                    : editingProject
                    ? "Update Project"
                    : "Submit Project"}{" "}
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
