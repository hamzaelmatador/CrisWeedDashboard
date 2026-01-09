import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faShoppingCart,
  faUsers,
  faBoxOpen,
  faArrowUp,
  faArrowDown,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { stats } from "../data/stats";
import SalesChart from "../components/Charts/SalesChart";
import "../styles/dashboard.css";

function Dashboard() {
  const [chartFilter, setChartFilter] = useState('12months');

  // Recent orders mock data
  const recentOrders = [
    { id: "#ORD-001", customer: "John Smith", product: "OG Kush", amount: "$45.00", status: "Completed" },
    { id: "#ORD-002", customer: "Sarah Johnson", product: "CBD Oil 10%", amount: "$30.00", status: "Pending" },
    { id: "#ORD-003", customer: "Mike Davis", product: "Purple Haze", amount: "$52.00", status: "Completed" },
    { id: "#ORD-004", customer: "Emily Brown", product: "Pre-roll Pack", amount: "$25.00", status: "Cancelled" },
    { id: "#ORD-005", customer: "Chris Wilson", product: "OG Kush", amount: "$45.00", status: "Completed" },
  ];

  // Top products mock data
  const topProducts = [
    { name: "OG Kush", sales: 245, revenue: "$11,025" },
    { name: "CBD Oil 10%", sales: 189, revenue: "$5,670" },
    { name: "Purple Haze", sales: 156, revenue: "$8,112" },
    { name: "Pre-roll Pack", sales: 98, revenue: "$2,450" },
  ];

  const getStatIcon = (index) => {
    const icons = [faDollarSign, faShoppingCart, faUsers, faBoxOpen];
    return icons[index % icons.length];
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards Section */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={getStatIcon(index)} />
            </div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <div className={`stat-change ${stat.trend === "up" ? "trend-up" : "trend-down"}`}>
                <FontAwesomeIcon icon={stat.trend === "up" ? faArrowUp : faArrowDown} />
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Chart Section */}
        <div className="dashboard-card chart-section">
          <div className="card-header">
            <h3>Sales Overview</h3>
            <div className="card-actions">
              <select 
                className="chart-filter" 
                value={chartFilter}
                onChange={(e) => setChartFilter(e.target.value)}
              >
                <option value="12months">Last 12 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="30days">Last 30 Days</option>
              </select>
            </div>
          </div>
          <SalesChart timeFilter={chartFilter} />
        </div>

        {/* Recent Orders Section */}
        <div className="dashboard-card recent-orders">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <Link to="/orders" className="view-all-btn">View All</Link>
          </div>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products Section */}
        <div className="dashboard-card top-products">
          <div className="card-header">
            <h3>Top Products</h3>
            <FontAwesomeIcon icon={faStar} className="star-icon" />
          </div>
          <div className="products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-rank">{index + 1}</div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.sales} sales</p>
                </div>
                <div className="product-revenue">{product.revenue}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="dashboard-card quick-stats">
          <div className="card-header">
            <h3>Activity</h3>
            <FontAwesomeIcon icon={faClock} className="clock-icon" />
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <p>New order received</p>
                <span>2 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <p>Payment completed</p>
                <span>15 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <p>New customer registered</p>
                <span>1 hour ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <p>Product restocked: OG Kush</p>
                <span>3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

