import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCalendar,
  faShoppingBag,
  faDollarSign,
  faEye,
  faEdit,
  faTrash,
  faChevronLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/customers.css";

function Customers() {
  const [customers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinedDate: "2023-06-15",
      totalOrders: 12,
      totalSpent: "$1,245.00",
      avatar: null,
      status: "Active",
      lastOrder: "2024-01-15",
      favoriteProduct: "OG Kush",
      notes: "Premium customer, prefers express shipping",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      joinedDate: "2023-08-22",
      totalOrders: 8,
      totalSpent: "$890.00",
      avatar: null,
      status: "Active",
      lastOrder: "2024-01-15",
      favoriteProduct: "CBD Oil 10%",
      notes: "Interested in CBD products only",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.d@email.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      joinedDate: "2023-03-10",
      totalOrders: 24,
      totalSpent: "$2,450.00",
      avatar: null,
      status: "VIP",
      lastOrder: "2024-01-14",
      favoriteProduct: "Purple Haze",
      notes: "VIP customer, responds well to promotions",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.b@email.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      joinedDate: "2023-11-05",
      totalOrders: 5,
      totalSpent: "$425.00",
      avatar: null,
      status: "Active",
      lastOrder: "2024-01-14",
      favoriteProduct: "Pre-roll Pack",
      notes: "",
    },
    {
      id: 5,
      name: "Chris Wilson",
      email: "chris.w@email.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, AZ",
      joinedDate: "2023-01-20",
      totalOrders: 18,
      totalSpent: "$1,890.00",
      avatar: null,
      status: "Active",
      lastOrder: "2024-01-13",
      favoriteProduct: "OG Kush",
      notes: "Regular customer, always orders on weekends",
    },
    {
      id: 6,
      name: "Amanda Lee",
      email: "amanda.l@email.com",
      phone: "+1 (555) 678-9012",
      location: "Philadelphia, PA",
      joinedDate: "2023-09-18",
      totalOrders: 3,
      totalSpent: "$210.00",
      avatar: null,
      status: "Inactive",
      lastOrder: "2024-01-10",
      favoriteProduct: "Edibles Bundle",
      notes: "Hasn't ordered in a while, consider re-engagement",
    },
    {
      id: 7,
      name: "David Kim",
      email: "david.k@email.com",
      phone: "+1 (555) 789-0123",
      location: "San Antonio, TX",
      joinedDate: "2023-07-12",
      totalOrders: 15,
      totalSpent: "$1,560.00",
      avatar: null,
      status: "Active",
      lastOrder: "2024-01-12",
      favoriteProduct: "CBD Oil 20%",
      notes: "Medical user, orders for wellness",
    },
    {
      id: 8,
      name: "Jessica Taylor",
      email: "jessica.t@email.com",
      phone: "+1 (555) 890-1234",
      location: "San Diego, CA",
      joinedDate: "2023-04-25",
      totalOrders: 9,
      totalSpent: "$980.00",
      avatar: null,
      status: "Active",
      lastOrder: "2024-01-12",
      favoriteProduct: "Purple Haze",
      notes: "New customer, exploring different products",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active": return "status-active";
      case "Inactive": return "status-inactive";
      case "VIP": return "status-vip";
      default: return "";
    }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    if (window.innerWidth <= 768) {
      setShowMobilePreview(true);
    }
  };

  // Calculate stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const vipCustomers = customers.filter((c) => c.status === "VIP").length;
  const totalRevenue = customers.reduce((sum, c) => sum + parseFloat(c.totalSpent.replace("$", "")), 0);

  return (
    <div className="customers-page">
      <div className="customers-header">
        <h1>Customers</h1>
        <p>Manage your customer relationships</p>
      </div>

      {/* Stats Cards */}
      <div className="customers-stats">
        <div className="stat-card">
          <div className="stat-icon users-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="stat-details">
            <p>Total Customers</p>
            <h3>{totalCustomers}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-icon">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="stat-details">
            <p>Active Customers</p>
            <h3>{activeCustomers}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon vip-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="stat-details">
            <p>VIP Customers</p>
            <h3>{vipCustomers}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <div className="stat-details">
            <p>Total Revenue</p>
            <h3>${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="customers-toolbar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      {/* Main Content Grid */}
      <div className="customers-content">
        {/* Customers List */}
        <div className={`customers-list-container ${showMobilePreview ? "preview-open" : ""}`}>
          <div className="customers-list-header">
            <h3>Customer List</h3>
            <span className="customer-count">{filteredCustomers.length} customers</span>
          </div>

          <div className="customers-list">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`customer-card ${selectedCustomer?.id === customer.id ? "selected" : ""}`}
                  onClick={() => handleSelectCustomer(customer)}
                >
                  <div className="customer-avatar">
                    {customer.avatar ? (
                      <img src={customer.avatar} alt={customer.name} />
                    ) : (
                      <span>{customer.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="customer-info">
                    <div className="customer-name-row">
                      <h4>{customer.name}</h4>
                      <span className={`status-badge-small ${getStatusBadgeClass(customer.status)}`}>
                        {customer.status}
                      </span>
                    </div>
                    <p className="customer-email">{customer.email}</p>
                    <div className="customer-meta">
                      <span><FontAwesomeIcon icon={faShoppingBag} /> {customer.totalOrders} orders</span>
                      <span><FontAwesomeIcon icon={faDollarSign} /> {customer.totalSpent}</span>
                    </div>
                  </div>
                  <button className="view-details-btn">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <FontAwesomeIcon icon={faUser} />
                <p>No customers found</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Preview Panel */}
        <div className={`customer-preview ${showMobilePreview ? "mobile-open" : ""}`}>
          {selectedCustomer ? (
            <>
              <div className="preview-header">
                <button
                  className="back-btn"
                  onClick={() => {
                    setShowMobilePreview(false);
                    setSelectedCustomer(null);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h3>Customer Details</h3>
                <div className="preview-actions">
                  <button className="action-btn" title="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="action-btn delete" title="Delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              <div className="preview-content">
                {/* Profile Section */}
                <div className="profile-section">
                  <div className="profile-avatar">
                    {selectedCustomer.avatar ? (
                      <img src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                    ) : (
                      <span>{selectedCustomer.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="profile-info">
                    <h2>{selectedCustomer.name}</h2>
                    <span className={`status-badge ${getStatusBadgeClass(selectedCustomer.status)}`}>
                      {selectedCustomer.status}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="info-section">
                  <h4>Contact Information</h4>
                  <div className="info-list">
                    <div className="info-item">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <div>
                        <span className="label">Email</span>
                        <span className="value">{selectedCustomer.email}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <FontAwesomeIcon icon={faPhone} />
                      <div>
                        <span className="label">Phone</span>
                        <span className="value">{selectedCustomer.phone}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <div>
                        <span className="label">Location</span>
                        <span className="value">{selectedCustomer.location}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <FontAwesomeIcon icon={faCalendar} />
                      <div>
                        <span className="label">Joined Date</span>
                        <span className="value">{selectedCustomer.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="info-section">
                  <h4>Statistics</h4>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faShoppingBag} />
                      <div>
                        <span className="stat-value">{selectedCustomer.totalOrders}</span>
                        <span className="stat-label">Orders</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faDollarSign} />
                      <div>
                        <span className="stat-value">{selectedCustomer.totalSpent}</span>
                        <span className="stat-label">Total Spent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="info-section">
                  <h4>Additional Information</h4>
                  <div className="additional-info">
                    <div className="info-row">
                      <span className="label">Last Order</span>
                      <span className="value">{selectedCustomer.lastOrder}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Favorite Product</span>
                      <span className="value">{selectedCustomer.favoriteProduct}</span>
                    </div>
                    {selectedCustomer.notes && (
                      <div className="notes-section">
                        <span className="label">Notes</span>
                        <p>{selectedCustomer.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <FontAwesomeIcon icon={faUser} />
              <h3>Select a Customer</h3>
              <p>Click on a customer from the list to view their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;

