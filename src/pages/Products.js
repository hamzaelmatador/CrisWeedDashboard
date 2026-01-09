import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faImage,
  faChevronDown,
  faChevronUp,
  faUpload,
  faTimes,
  faFolderOpen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { products as initialProducts } from "../data/products";
import "../styles/products.css";

function Products() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(["Flower", "Oil", "Pre-roll", "Edibles", "Accessories"]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: "", id: null, name: "" });
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    category: "Flower",
    price: "",
    stock: "In Stock",
    image: null,
    imagePreview: null,
  });

  const stockOptions = ["In Stock", "Low Stock", "Out of Stock"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    const matchesStock = stockFilter === "All" || product.stock === stockFilter;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: formData.price,
      stock: formData.stock,
      image: formData.imagePreview || "https://images.unsplash.com/photo-1508503699449-c06a7de63b94?w=100&h=100&fit=crop",
    };
    setProducts((prev) => [newProduct, ...prev]);
    resetProductForm();
  };

  const resetProductForm = () => {
    setFormData({
      name: "",
      category: "Flower",
      price: "",
      stock: "In Stock",
      image: null,
      imagePreview: null,
    });
    setShowProductForm(false);
  };

  const handleDeleteClick = (type, id, name) => {
    setDeleteItem({ type, id, name });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteItem.type === "product") {
      setProducts((prev) => prev.filter((p) => p.id !== deleteItem.id));
    } else if (deleteItem.type === "category") {
      const productsWithCategory = products.filter((p) => p.category === deleteItem.name);
      if (productsWithCategory.length > 0) {
        alert(`Cannot delete "${deleteItem.name}" category. ${productsWithCategory.length} products are using this category.`);
        setShowDeleteModal(false);
        return;
      }
      setCategories((prev) => prev.filter((c) => c !== deleteItem.name));
      if (categoryFilter === deleteItem.name) {
        setCategoryFilter("All");
      }
    }
    setShowDeleteModal(false);
    setDeleteItem({ type: "", id: null, name: "" });
  };

  const handleEditClick = (product) => {
    setEditItem({ ...product });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((p) => (p.id === editItem.id ? { ...editItem } : p))
    );
    setShowEditModal(false);
    setEditItem(null);
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditItem((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getStockBadgeClass = (stock) => {
    switch (stock) {
      case "In Stock": return "stock-in";
      case "Low Stock": return "stock-low";
      case "Out of Stock": return "stock-out";
      default: return "";
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        <p>Manage your product inventory and categories</p>
      </div>

      <button
        className={`add-product-toggle ${showProductForm ? "active" : ""}`}
        onClick={() => setShowProductForm(!showProductForm)}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>{showProductForm ? "Close Form" : "Add New Product"}</span>
        <FontAwesomeIcon icon={showProductForm ? faChevronUp : faChevronDown} />
      </button>

      {showProductForm && (
        <div className="add-product-form">
          <div className="form-header">
            <h3>Add New Product</h3>
            <button className="close-form-btn" onClick={resetProductForm}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <form onSubmit={handleProductSubmit}>
            <div className="form-row">
              <div className="form-group image-upload-group">
                <label>Product Image</label>
                <div className="image-upload-area">
                  {formData.imagePreview ? (
                    <div className="image-preview">
                      <img src={formData.imagePreview} alt="Preview" />
                      <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <FontAwesomeIcon icon={faImage} />
                      <span>Click or drag to upload</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-right">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-row-inline">
                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price ($) *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock Status *</label>
                  <select
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  >
                    {stockOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={resetProductForm}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    <FontAwesomeIcon icon={faUpload} />
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="category-section">
        <div className="category-header">
          <h3>Categories</h3>
          <Link to="/categories" className="add-category-link">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span>Add New Category</span>
          </Link>
        </div>

        <div className="categories-list">
          {categories.map((cat) => {
            const productCount = products.filter((p) => p.category === cat).length;
            return (
              <div key={cat} className="category-item">
                <div className="category-info">
                  <span className="category-name">{cat}</span>
                  <span className="category-count">{productCount} products</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdowns">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="All">All Stock Status</option>
            {stockOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th className="col-image">Image</th>
              <th className="col-name">Name</th>
              <th className="col-category">Category</th>
              <th className="col-price">Price</th>
              <th className="col-stock">Stock Status</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="col-image">
                    <div className="product-image">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="no-image">
                          <FontAwesomeIcon icon={faImage} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="col-name">
                    <span className="product-name">{product.name}</span>
                  </td>
                  <td className="col-category">
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className="col-price">{product.price}</td>
                  <td className="col-stock">
                    <span className={`stock-badge ${getStockBadgeClass(product.stock)}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="col-actions">
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        title="Edit"
                        onClick={() => handleEditClick(product)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="delete-btn"
                        title="Delete"
                        onClick={() => handleDeleteClick("product", product.id, product.name)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">
                  No products found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="results-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <FontAwesomeIcon icon={faTrash} />
            </div>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete <strong>{deleteItem.name}</strong>
              {deleteItem.type === "product" ? " product" : " category"}?
            </p>
            {deleteItem.type === "category" && (
              <p className="modal-warning">
                Note: This will only work if no products are using this category.
              </p>
            )}
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="modal-delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editItem && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-container edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="close-form-btn" onClick={() => setShowEditModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="edit-form-row">
                <div className="form-group image-upload-group">
                  <label>Product Image</label>
                  <div className="image-upload-area">
                    {editItem.imagePreview ? (
                      <div className="image-preview">
                        <img src={editItem.imagePreview} alt="Preview" />
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <FontAwesomeIcon icon={faImage} />
                        <span>Click to change</span>
                        <input type="file" accept="image/*" onChange={handleEditImageUpload} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-right">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={editItem.name}
                      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row-inline">
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        value={editItem.category}
                        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Price ($) *</label>
                      <input
                        type="number"
                        value={editItem.price.replace("$", "")}
                        onChange={(e) => setEditItem({ ...editItem, price: `$${e.target.value}` })}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Stock Status *</label>
                    <select
                      value={editItem.stock}
                      onChange={(e) => setEditItem({ ...editItem, stock: e.target.value })}
                    >
                      {stockOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      <FontAwesomeIcon icon={faCheck} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

