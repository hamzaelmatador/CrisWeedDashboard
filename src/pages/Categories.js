import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faBox,
  faSeedling,
  faTint,
  faSmoking,
  faCookie,
  faTools,
  faLeaf,
  faFlask,
  faPills,
  faWeight,
  faFire,
  faCapsules,
  faGripLines,
  faImage,
  faFolderPlus,
  faCheck,
  faTimes,
  faEye,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/categories.css";

function Categories() {
  // Available colors for auto-selection
  const availableColors = [
    "#2e7d32", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b",
    "#ffc107", "#ff9800", "#ff5722", "#f44336", "#e91e63",
    "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#00bcd4",
    "#009688", "#607d8b"
  ];

  // Available icons for selection
  const availableIcons = [
    { name: "faSeedling", icon: faSeedling, label: "Plant" },
    { name: "faLeaf", icon: faLeaf, label: "Leaf" },
    { name: "faTint", icon: faTint, label: "Oil" },
    { name: "faSmoking", icon: faSmoking, label: "Smoke" },
    { name: "faCookie", icon: faCookie, label: "Edible" },
    { name: "faTools", icon: faTools, label: "Tools" },
    { name: "faFlask", icon: faFlask, label: "Lab" },
    { name: "faPills", icon: faPills, label: "Pills" },
    { name: "faWeight", icon: faWeight, label: "Scale" },
    { name: "faFire", icon: faFire, label: "Fire" },
    { name: "faCapsules", icon: faCapsules, label: "Capsules" },
    { name: "faGripLines", icon: faGripLines, label: "Lines" },
  ];

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Flower",
      icon: "faSeedling",
      iconObj: faSeedling,
      productCount: 45,
      revenue: "$45,200",
      status: "Active",
      description: "Premium cannabis flowers strains including OG Kush, Purple Haze, and Blue Dream. Available in various weights.",
      color: "#2e7d32",
      image: null,
    },
    {
      id: 2,
      name: "Oil",
      icon: "faTint",
      iconObj: faTint,
      productCount: 28,
      revenue: "$32,500",
      status: "Active",
      description: "CBD and THC oils in different concentrations. Full spectrum, broad spectrum, and isolate options.",
      color: "#4caf50",
      image: null,
    },
    {
      id: 3,
      name: "Pre-roll",
      icon: "faSmoking",
      iconObj: faSmoking,
      productCount: 15,
      revenue: "$18,900",
      status: "Active",
      description: "Pre-rolled joints and blunts. Various sizes and strains available for immediate use.",
      color: "#8bc34a",
      image: null,
    },
    {
      id: 4,
      name: "Edibles",
      icon: "faCookie",
      iconObj: faCookie,
      productCount: 22,
      revenue: "$15,600",
      status: "Active",
      description: "Cannabis-infused edibles including gummies, chocolates, brownies, and beverages.",
      color: "#ff9800",
      image: null,
    },
    {
      id: 5,
      name: "Accessories",
      icon: "faTools",
      iconObj: faTools,
      productCount: 35,
      revenue: "$12,800",
      status: "Inactive",
      description: "Rolling papers, pipes, bongs, grinders, and other cannabis consumption accessories.",
      color: "#607d8b",
      image: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "",
    icon: "faSeedling",
    iconObj: faSeedling,
    image: null,
    imagePreview: null,
  });

  // Get next available color that's not used
  const getNextAvailableColor = () => {
    const usedColors = categories.map(c => c.color.toLowerCase());
    const defaultGreen = "#2e7d32";
    if (!usedColors.includes(defaultGreen.toLowerCase())) {
      return defaultGreen;
    }
    return availableColors.find(c => !usedColors.includes(c.toLowerCase())) || defaultGreen;
  };

  // Check if color is already used
  const isColorUsed = (color) => {
    return categories.some(c => c.color.toLowerCase() === color.toLowerCase());
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const category = {
      id: Date.now(),
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color || getNextAvailableColor(),
      icon: newCategory.icon,
      iconObj: newCategory.iconObj,
      productCount: 0,
      revenue: "$0",
      status: "Active",
      image: newCategory.imagePreview,
    };
    setCategories((prev) => [...prev, category]);
    setNewCategory({
      name: "",
      description: "",
      color: getNextAvailableColor(),
      icon: "faSeedling",
      iconObj: faSeedling,
      image: null,
      imagePreview: null,
    });
    setShowAddForm(false);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
    }
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  // View category handler
  const handleViewClick = (category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  // Edit category handler - opens confirmation modal first
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditingCategory({ ...category });
    setShowEditModal(true);
  };

  // Confirm edit with warning about products being affected
  const confirmEdit = () => {
    if (selectedCategory && editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory.id ? { ...editingCategory, id: c.id } : c
        )
      );
    }
    setShowEditModal(false);
    setSelectedCategory(null);
    setEditingCategory(null);
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit color change
  const handleEditColorChange = (e) => {
    const color = e.target.value;
    setEditingCategory((prev) => ({
      ...prev,
      color: color,
    }));
  };

  // Handle edit icon selection
  const selectEditIcon = (iconName, iconComponent) => {
    setEditingCategory((prev) => ({
      ...prev,
      icon: iconName,
      iconObj: iconComponent,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCategory(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewCategory(prev => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  const selectIcon = (iconName, iconComponent) => {
    setNewCategory(prev => ({
      ...prev,
      icon: iconName,
      iconObj: iconComponent,
    }));
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setNewCategory(prev => ({
      ...prev,
      color: color,
    }));
  };

  const getStatusBadgeClass = (status) => {
    return status === "Active" ? "status-active" : "status-inactive";
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize with auto-selected color
  useEffect(() => {
    if (!newCategory.color) {
      setNewCategory(prev => ({ ...prev, color: getNextAvailableColor() }));
    }
  }, []);

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Categories</h1>
        <p>Manage your product categories</p>
      </div>

      {/* Stats Overview */}
      <div className="categories-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faFolderPlus} />
          </div>
          <div className="stat-info">
            <p>Total Categories</p>
            <h3>{categories.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon products-icon">
            <FontAwesomeIcon icon={faBox} />
          </div>
          <div className="stat-info">
            <p>Total Products</p>
            <h3>{categories.reduce((sum, c) => sum + c.productCount, 0)}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <FontAwesomeIcon icon={faSeedling} />
          </div>
          <div className="stat-info">
            <p>Active Categories</p>
            <h3>{categories.filter((c) => c.status === "Active").length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon inactive-icon">
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <div className="stat-info">
            <p>Inactive Categories</p>
            <h3>{categories.filter((c) => c.status === "Inactive").length}</h3>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="categories-actions">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className={`add-category-btn ${showAddForm ? "active" : ""}`}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>{showAddForm ? "Close Form" : "Add Category"}</span>
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="add-category-form">
          <div className="form-header">
            <h3>Add New Category</h3>
            <button className="close-btn" onClick={() => setShowAddForm(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleAddCategory}>
            {/* Image Upload */}
            <div className="form-group">
              <label>Category Image (Optional)</label>
              <div className="image-upload-section">
                {newCategory.imagePreview ? (
                  <div className="image-preview-container">
                    <img src={newCategory.imagePreview} alt="Category preview" className="image-preview" />
                    <button type="button" className="remove-image-btn" onClick={removeImage}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <div className="image-upload-area">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="image-input" />
                    <FontAwesomeIcon icon={faImage} />
                    <span>Click or drag to upload image</span>
                    <span className="upload-hint">If no image is uploaded, you can choose an icon below</span>
                  </div>
                )}
              </div>
            </div>

            {/* Icon Selection */}
            {!newCategory.imagePreview && (
              <div className="form-group">
                <label>Choose an Icon</label>
                <div className="icon-selector">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon.name}
                      type="button"
                      className={`icon-option ${newCategory.icon === icon.name ? "selected" : ""}`}
                      onClick={() => selectIcon(icon.name, icon.icon)}
                      style={{ color: newCategory.color }}
                      title={icon.label}
                    >
                      <FontAwesomeIcon icon={icon.icon} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Color 
                  {isColorUsed(newCategory.color) && (
                    <span className="color-warning"> (Already used)</span>
                  )}
                </label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={handleColorChange}
                    className="color-input"
                  />
                  <span className="color-hex">{newCategory.color}</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, description: e.target.value })
                }
                placeholder="Enter category description"
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isColorUsed(newCategory.color)}
              >
                <FontAwesomeIcon icon={faCheck} />
                Add Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="categories-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id} className="category-card">
              {/* Category Image or Icon Header */}
              <div 
                className="category-header-bg" 
                style={{ 
                  background: category.image 
                    ? `url(${category.image}) center/cover`
                    : category.color 
                }}
              >
                {!category.image && (
                  <div className="category-icon-large">
                    <FontAwesomeIcon icon={category.iconObj} />
                  </div>
                )}
              </div>
              
              <div className="category-info">
                <div className="category-info-grid">
                  <h3 className="category-name">{category.name}</h3>
                  <div className="category-stats-grid">
                    <span className="product-count">
                      <FontAwesomeIcon icon={faBox} />
                      {category.productCount} products
                    </span>
                    <span className="category-revenue">
                      {category.revenue}
                    </span>
                  </div>
                  <span className={`status-badge ${getStatusBadgeClass(
                    category.status
                  )}`}>
                    {category.status}
                  </span>
                </div>
              </div>
              <div className="category-actions">
                <button 
                  className="action-btn view-btn" 
                  title="View Details"
                  onClick={() => handleViewClick(category)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button 
                  className="action-btn edit-btn" 
                  title="Edit"
                  onClick={() => handleEditClick(category)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="action-btn delete-btn"
                  title="Delete"
                  onClick={() => handleDeleteClick(category)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <FontAwesomeIcon icon={faFolderPlus} />
            <p>No categories found</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-icon">
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete <strong>{selectedCategory.name}</strong>?
            </p>
            {selectedCategory.productCount > 0 && (
              <p className="modal-warning">
                Warning: This category contains {selectedCategory.productCount}{" "}
                products.
              </p>
            )}
            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="modal-delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {showViewModal && selectedCategory && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div
            className="modal-container view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="view-modal-header">
              <div 
                className="view-modal-icon"
                style={{ background: selectedCategory.color }}
              >
                <FontAwesomeIcon icon={selectedCategory.iconObj} />
              </div>
              <button className="close-btn" onClick={() => setShowViewModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <h3 className="view-modal-title">{selectedCategory.name}</h3>
            <div className="view-modal-details">
              <div className="view-detail-item">
                <span className="detail-label">Status</span>
                <span className={`status-badge ${getStatusBadgeClass(selectedCategory.status)}`}>
                  {selectedCategory.status}
                </span>
              </div>
              <div className="view-detail-item">
                <span className="detail-label">Products</span>
                <span className="detail-value">{selectedCategory.productCount}</span>
              </div>
              <div className="view-detail-item">
                <span className="detail-label">Revenue</span>
                <span className="detail-value revenue-value">{selectedCategory.revenue}</span>
              </div>
              {selectedCategory.description && (
                <div className="view-detail-item full-width">
                  <span className="detail-label">Description</span>
                  <span className="detail-value">{selectedCategory.description}</span>
                </div>
              )}
            </div>
            <div className="view-modal-footer">
              <button 
                className="modal-close-btn" 
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal with Warning */}
      {showEditModal && selectedCategory && editingCategory && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div
            className="modal-container edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="edit-modal-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span>Warning: This change will affect all products under this category</span>
            </div>
            <h3 className="edit-modal-title">Edit Category</h3>
            <form onSubmit={(e) => { e.preventDefault(); confirmEdit(); }}>
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={editingCategory.name}
                  onChange={handleEditChange}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      value={editingCategory.color}
                      onChange={handleEditColorChange}
                      className="color-input"
                    />
                    <span className="color-hex">{editingCategory.color}</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={editingCategory.status}
                    onChange={handleEditChange}
                    className="status-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editingCategory.description}
                  onChange={handleEditChange}
                  placeholder="Enter category description"
                  rows="3"
                />
              </div>
              <div className="edit-modal-info">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>{selectedCategory.productCount} products will be updated with this category</span>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    setEditingCategory(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-update-btn">
                  <FontAwesomeIcon icon={faCheck} />
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;

