import { useState, useEffect } from 'react';
import { salesData } from '../../data/sales';
import '../../styles/chart.css';

function SalesChart({ timeFilter = '12months' }) {
  const [filteredData, setFilteredData] = useState(salesData);
  const [maxSales, setMaxSales] = useState(0);

  useEffect(() => {
    // Calculate max sales for scaling
    const max = Math.max(...salesData.map(d => d.sales));
    setMaxSales(max);
  }, []);

  useEffect(() => {
    // Filter data based on time filter
    let filtered = [...salesData];
    switch (timeFilter) {
      case '6months':
        filtered = salesData.slice(6);
        break;
      case '30days':
        // Generate 30 days of data
        filtered = Array.from({ length: 30 }, (_, i) => ({
          month: `Day ${i + 1}`,
          sales: Math.floor(Math.random() * 4000) + 800
        }));
        break;
      default:
        filtered = salesData;
    }
    setFilteredData(filtered);
    setMaxSales(Math.max(...filtered.map(d => d.sales)));
  }, [timeFilter]);

  const formatSales = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="sales-chart">
      <div className="chart-header">
        <h3>Sales Overview</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: 'var(--primary)' }}></span>
            <span>Revenue</span>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-y-axis">
          {Array.from({ length: 5 }, (_, i) => {
            const value = Math.round((maxSales / 4) * (4 - i));
            return (
              <div key={i} className="y-axis-label">
                {formatSales(value)}
              </div>
            );
          })}
        </div>
        
        <div className="chart-bars-container">
          {filteredData.map((item, index) => {
            const height = (item.sales / maxSales) * 100;
            return (
              <div key={index} className="chart-bar-wrapper">
                <div className="chart-bar-label">{item.month}</div>
                <div 
                  className="chart-bar" 
                  style={{ 
                    height: `${height}%`
                  }}
                >
                  <div className="chart-bar-fill"></div>
                </div>
                <div className="chart-bar-value">{formatSales(item.sales)}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">
            ${filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average</span>
          <span className="stat-value">
            ${Math.round(filteredData.reduce((sum, item) => sum + item.sales, 0) / filteredData.length).toLocaleString()}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Growth</span>
          <span className="stat-value growth-up">
            +{Math.round(((filteredData[filteredData.length - 1]?.sales || 0) - (filteredData[0]?.sales || 0)) / (filteredData[0]?.sales || 1) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default SalesChart;
