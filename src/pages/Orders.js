import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faEye,
  faPrint,
  faFileInvoice,
  faBox,
  faDollarSign,
  faChevronDown,
  faChevronUp,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/orders.css";

function Orders() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const [orders] = useState([
    {
      id: "#ORD-2024-001",
      customer: "John Smith",
      email: "john.smith@email.com",
      product: "OG Kush (3.5g)",
      quantity: 2,
      price: "$90.00",
      status: "Delivered",
      payment: "Paid",
      date: "2024-01-15",
      address: "123 Main St, New York, NY 10001",
    },
    {
      id: "#ORD-2024-002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      product: "CBD Oil 10%",
      quantity: 1,
      price: "$30.00",
      status: "Processing",
      payment: "Paid",
      date: "2024-01-15",
      address: "456 Oak Ave, Los Angeles, CA 90001",
    },
    {
      id: "#ORD-2024-003",
      customer: "Mike Davis",
      email: "mike.d@email.com",
      product: "Pre-roll Pack",
      quantity: 1,
      price: "$25.00",
      status: "Shipped",
      payment: "Paid",
      date: "2024-01-14",
      address: "789 Pine Rd, Chicago, IL 60601",
    },
    {
      id: "#ORD-2024-004",
      customer: "Emily Brown",
      email: "emily.b@email.com",
      product: "Purple Haze",
      quantity: 1,
      price: "$52.00",
      status: "Pending",
      payment: "Pending",
      date: "2024-01-14",
      address: "321 Elm St, Houston, TX 77001",
    },
    {
      id: "#ORD-2024-005",
      customer: "Chris Wilson",
      email: "chris.w@email.com",
      product: "OG Kush (7g)",
      quantity: 1,
      price: "$85.00",
      status: "Delivered",
      payment: "Paid",
      date: "2024-01-13",
      address: "654 Maple Dr, Phoenix, AZ 85001",
    },
    {
      id: "#ORD-2024-006",
      customer: "Amanda Lee",
      email: "amanda.l@email.com",
      product: "Edibles Bundle",
      quantity: 1,
      price: "$45.00",
      status: "Cancelled",
      payment: "Refunded",
      date: "2024-01-13",
      address: "987 Cedar Ln, Philadelphia, PA 19101",
    },
    {
      id: "#ORD-2024-007",
      customer: "David Kim",
      email: "david.k@email.com",
      product: "CBD Oil 20%",
      quantity: 2,
      price: "$120.00",
      status: "Processing",
      payment: "Paid",
      date: "2024-01-12",
      address: "147 Birch Way, San Antonio, TX 78201",
    },
    {
      id: "#ORD-2024-008",
      customer: "Jessica Taylor",
      email: "jessica.t@email.com",
      product: "Purple Haze",
      quantity: 2,
      price: "$104.00",
      status: "Shipped",
      payment: "Paid",
      date: "2024-01-12",
      address: "258 Walnut Blvd, San Diego, CA 92101",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "All" || order.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered": return "status-delivered";
      case "Shipped": return "status-shipped";
      case "Processing": return "status-processing";
      case "Pending": return "status-pending";
      case "Cancelled": return "status-cancelled";
      default: return "";
    }
  };

  const getPaymentBadgeClass = (payment) => {
    switch (payment) {
      case "Paid": return "payment-paid";
      case "Pending": return "payment-pending";
      case "Refunded": return "payment-refunded";
      default: return "";
    }
  };

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.payment === "Paid")
    .reduce((sum, o) => sum + parseFloat(o.price.replace("$", "")), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Orders</h1>
        <p>Manage and track all customer orders</p>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <FontAwesomeIcon icon={faFileInvoice} />
          </div>
          <div className="stat-details">
            <p>Total Orders</p>
            <h3>{totalOrders}</h3>
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

        <div className="stat-card">
          <div className="stat-icon pending-icon">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="stat-details">
            <p>Pending Orders</p>
            <h3>{pendingOrders}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon delivered-icon">
            <FontAwesomeIcon icon={faBox} />
          </div>
          <div className="stat-details">
            <p>Delivered</p>
            <h3>{deliveredOrders}</h3>
          </div>
        </div>
      </div>

      <div className="orders-toolbar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className={`filter-toggle ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>Filters</span>
          <FontAwesomeIcon icon={showFilters ? faChevronUp : faChevronDown} />
        </button>
      </div>

      {showFilters && (
        <div className="filter-options">
          <div className="filter-group">
            <label>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Payment</label>
            <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>
      )}

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th className="col-order">Order ID</th>
              <th className="col-date">Date</th>
              <th className="col-customer">Customer</th>
              <th className="col-product">Product</th>
              <th className="col-qty">Qty</th>
              <th className="col-price">Price</th>
              <th className="col-status">Status</th>
              <th className="col-payment">Payment</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="col-order">
                    <span className="order-id">{order.id}</span>
                  </td>
                  <td className="col-date">
                    <div className="date-cell">
                      <FontAwesomeIcon icon={faClock} />
                      <span>{order.date}</span>
                    </div>
                  </td>
                  <td className="col-customer">
                    <div className="customer-cell">
                      <div className="customer-avatar">
                        {order.customer.charAt(0)}
                      </div>
                      <div className="customer-info">
                        <span className="customer-name">{order.customer}</span>
                        <span className="customer-email">{order.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="col-product">
                    <span className="product-name">{order.product}</span>
                  </td>
                  <td className="col-qty">{order.quantity}</td>
                  <td className="col-price">{order.price}</td>
                  <td className="col-status">
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="col-payment">
                    <span className={`payment-badge ${getPaymentBadgeClass(order.payment)}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="col-actions">
                    <div className="action-buttons">
                      <button
                        className="view-btn"
                        title="View Details"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="print-btn" title="Print Invoice">
                        <FontAwesomeIcon icon={faPrint} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-results">
                  No orders found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="results-count">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                <FontAwesomeIcon icon={faEye} style={{ transform: "rotate(180deg)" }} />
              </button>
            </div>

            <div className="modal-body">
              <div className="order-header-info">
                <div className="order-id-display">
                  <span className="label">Order ID</span>
                  <span className="value">{selectedOrder.id}</span>
                </div>
                <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    <span className="label">Date</span>
                    <span className="value">{selectedOrder.date}</span>
                  </div>
                </div>

                <div className="info-item">
                  <FontAwesomeIcon icon={faFileInvoice} />
                  <div>
                    <span className="label">Customer</span>
                    <span className="value">{selectedOrder.customer}</span>
                  </div>
                </div>

                <div className="info-item">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <span className="label">Product</span>
                    <span className="value">{selectedOrder.product}</span>
                  </div>
                </div>

                <div className="info-item">
                  <FontAwesomeIcon icon={faDollarSign} />
                  <div>
                    <span className="label">Payment</span>
                    <span className={`value ${selectedOrder.payment === "Paid" ? "text-success" : ""}`}>
                      {selectedOrder.payment}
                    </span>
                  </div>
                </div>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Quantity</span>
                  <span>{selectedOrder.quantity}</span>
                </div>
                <div className="summary-row">
                  <span>Price</span>
                  <span>{selectedOrder.price}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{selectedOrder.price}</span>
                </div>
              </div>

              <div className="shipping-info">
                <h4>Shipping Address</h4>
                <p>{selectedOrder.address}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="print-invoice-btn">
                <FontAwesomeIcon icon={faPrint} />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;

