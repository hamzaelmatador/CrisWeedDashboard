import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartBar,
  faChartPie,
  faArrowUp,
  faArrowDown,
  faDollarSign,
  faShoppingCart,
  faUsers,
  faBox,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/analytics.css";

function Analytics() {
  // Mock data for analytics
  const monthlyData = [
    { month: "Jan", revenue: 12000, orders: 120, visitors: 2400 },
    { month: "Feb", revenue: 15000, orders: 145, visitors: 2800 },
    { month: "Mar", revenue: 17000, orders: 165, visitors: 3100 },
    { month: "Apr", revenue: 14000, orders: 135, visitors: 2900 },
    { month: "May", revenue: 18000, orders: 175, visitors: 3400 },
    { month: "Jun", revenue: 21000, orders: 205, visitors: 3800 },
    { month: "Jul", revenue: 25000, orders: 245, visitors: 4200 },
    { month: "Aug", revenue: 23000, orders: 225, visitors: 4000 },
    { month: "Sep", revenue: 20000, orders: 195, visitors: 3600 },
    { month: "Oct", revenue: 26000, orders: 255, visitors: 4500 },
    { month: "Nov", revenue: 29000, orders: 285, visitors: 5000 },
    { month: "Dec", revenue: 32000, orders: 315, visitors: 5500 },
  ];

  const topProducts = [
    { name: "OG Kush", sales: 245, revenue: "$11,025", growth: 12.5 },
    { name: "CBD Oil 10%", sales: 189, revenue: "$5,670", growth: 8.2 },
    { name: "Purple Haze", sales: 156, revenue: "$8,112", growth: -2.4 },
    { name: "Pre-roll Pack", sales: 98, revenue: "$2,450", growth: 5.1 },
    { name: "Edibles Bundle", sales: 67, revenue: "$2,345", growth: 15.8 },
  ];

  const categoryData = [
    { name: "Flower", percentage: 45, color: "#2e7d32" },
    { name: "Oil", percentage: 25, color: "#4caf50" },
    { name: "Pre-roll", percentage: 15, color: "#8bc34a" },
    { name: "Edibles", percentage: 10, color: "#cddc39" },
    { name: "Accessories", percentage: 5, color: "#ffeb3b" },
  ];

  const getMaxRevenue = () => Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Track your store performance and insights</p>
      </div>

      {/* Summary Stats */}
      <div className="analytics-stats">
        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <div className="stat-info">
            <p>Total Revenue</p>
            <h3>$223,000</h3>
            <div className="stat-trend trend-up">
              <FontAwesomeIcon icon={faArrowUp} />
              <span>+18.5%</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <div className="stat-info">
            <p>Total Orders</p>
            <h3>2,165</h3>
            <div className="stat-trend trend-up">
              <FontAwesomeIcon icon={faArrowUp} />
              <span>+12.3%</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon visitors-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-info">
            <p>Total Visitors</p>
            <h3>45,200</h3>
            <div className="stat-trend trend-up">
              <FontAwesomeIcon icon={faArrowUp} />
              <span>+8.7%</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon conversion-icon">
            <FontAwesomeIcon icon={faChartPie} />
          </div>
          <div className="stat-info">
            <p>Conversion Rate</p>
            <h3>4.79%</h3>
            <div className="stat-trend trend-down">
              <FontAwesomeIcon icon={faArrowDown} />
              <span>-0.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="analytics-card">
        <div className="card-header">
          <h3>
            <FontAwesomeIcon icon={faChartLine} />
            Revenue Overview
          </h3>
          <select className="chart-filter">
            <option>This Year</option>
            <option>Last Year</option>
            <option>Last 6 Months</option>
          </select>
        </div>
        <div className="chart-container">
          <div className="chart-bars">
            {monthlyData.map((data, index) => (
              <div key={index} className="chart-bar-wrapper">
                <div
                  className="chart-bar"
                  style={{ height: `${(data.revenue / getMaxRevenue()) * 100}%` }}
                >
                  <span className="bar-tooltip">
                    ${data.revenue.toLocaleString()}
                  </span>
                </div>
                <span className="bar-label">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="analytics-bottom-grid">
        {/* Top Products */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>
              <FontAwesomeIcon icon={faBox} />
              Top Products
            </h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="product-row">
                <div className="product-rank">{index + 1}</div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.sales} sales</p>
                </div>
                <div className="product-stats">
                  <span className="product-revenue">{product.revenue}</span>
                  <span className={`product-growth ${product.growth >= 0 ? "trend-up" : "trend-down"}`}>
                    <FontAwesomeIcon icon={product.growth >= 0 ? faArrowUp : faArrowDown} />
                    {Math.abs(product.growth)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>
              <FontAwesomeIcon icon={faChartPie} />
              Category Distribution
            </h3>
          </div>
          <div className="category-chart">
            <div className="pie-chart-container">
              <div className="pie-chart">
                {categoryData.map((cat, index) => (
                  <div
                    key={index}
                    className="pie-segment"
                    style={{
                      background: `conic-gradient(${cat.color} 0deg ${cat.percentage * 3.6}deg, transparent ${cat.percentage * 3.6}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="category-legend">
              {categoryData.map((cat, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-color" style={{ background: cat.color }}></span>
                  <span className="legend-label">{cat.name}</span>
                  <span className="legend-value">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="analytics-card full-width">
          <div className="card-header">
            <h3>
              <FontAwesomeIcon icon={faChartBar} />
              Performance Metrics
            </h3>
          </div>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-header">
                <FontAwesomeIcon icon={faDollarSign} />
                <span>Average Order Value</span>
              </div>
              <h4>$102.98</h4>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-header">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Orders per Customer</span>
              </div>
              <h4>3.2</h4>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: "64%" }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-header">
                <FontAwesomeIcon icon={faUsers} />
                <span>Customer Retention</span>
              </div>
              <h4>68%</h4>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: "68%" }}></div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-header">
                <FontAwesomeIcon icon={faCalendar} />
                <span>Returning Customers</span>
              </div>
              <h4>42%</h4>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: "42%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;

