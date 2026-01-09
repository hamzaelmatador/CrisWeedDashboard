import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faBell,
  faLock,
  faCreditCard,
  faEnvelope,
  faGlobe,
  faSave,
  faEye,
  faEyeSlash,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/settings.css";

function Settings() {
  // Store Settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: "CrisWeed",
    storeEmail: "contact@crisweed.com",
    storePhone: "+1 (555) 000-0000",
    storeAddress: "123 Commerce St, Business City, BC 12345",
    currency: "USD",
    timezone: "America/New_York",
    logo: null,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNewOrder: true,
    emailLowStock: true,
    emailNewCustomer: false,
    pushNewOrder: true,
    pushLowStock: true,
    pushDailySummary: false,
    marketingEmails: false,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPasswords: false,
    twoFactorAuth: false,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptedPayments: ["Credit Card", "PayPal"],
    taxRate: "8.5",
    freeShippingThreshold: "100",
  });

  const [activeTab, setActiveTab] = useState("store");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: "store", label: "Store", icon: faStore },
    { id: "notifications", label: "Notifications", icon: faBell },
    { id: "security", label: "Security", icon: faLock },
    { id: "payments", label: "Payments", icon: faCreditCard },
  ];

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleToggle = (setting, key) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your store preferences and configurations</p>
      </div>

      {/* Save Success Message */}
      {saveSuccess && (
        <div className="save-success-message">
          <FontAwesomeIcon icon={faSave} />
          Settings saved successfully!
        </div>
      )}

      <div className="settings-content">
        {/* Tabs Navigation */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <FontAwesomeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="settings-panel">
          {/* Store Settings */}
          {activeTab === "store" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Store Information</h2>
                <p>Basic details about your store</p>
              </div>

              <form className="settings-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="form-group">
                  <label>Store Name</label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Store Address</label>
                  <textarea
                    value={storeSettings.storeAddress}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                    rows="2"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Currency</label>
                    <select
                      value={storeSettings.currency}
                      onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Timezone</label>
                    <select
                      value={storeSettings.timezone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, timezone: e.target.value })}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <FontAwesomeIcon icon={faSave} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Notification Preferences</h2>
                <p>Choose how you want to be notified</p>
              </div>

              <div className="notification-groups">
                <div className="notification-group">
                  <div className="group-header">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <h3>Email Notifications</h3>
                  </div>

                  <div className="toggle-list">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-label">New Order Received</span>
                        <span className="toggle-description">Get notified when a new order is placed</span>
                      </div>
                      <button
                        className={`toggle-button ${notificationSettings.emailNewOrder ? "active" : ""}`}
                        onClick={() => handleToggle(notificationSettings, "emailNewOrder")}
                      >
                        <FontAwesomeIcon icon={notificationSettings.emailNewOrder ? faToggleOn : faToggleOff} />
                      </button>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-label">Low Stock Alert</span>
                        <span className="toggle-description">Get notified when products are running low</span>
                      </div>
                      <button
                        className={`toggle-button ${notificationSettings.emailLowStock ? "active" : ""}`}
                        onClick={() => handleToggle(notificationSettings, "emailLowStock")}
                      >
                        <FontAwesomeIcon icon={notificationSettings.emailLowStock ? faToggleOn : faToggleOff} />
                      </button>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-label">New Customer</span>
                        <span className="toggle-description">Get notified when a new customer registers</span>
                      </div>
                      <button
                        className={`toggle-button ${notificationSettings.emailNewCustomer ? "active" : ""}`}
                        onClick={() => handleToggle(notificationSettings, "emailNewCustomer")}
                      >
                        <FontAwesomeIcon icon={notificationSettings.emailNewCustomer ? faToggleOn : faToggleOff} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="notification-group">
                  <div className="group-header">
                    <FontAwesomeIcon icon={faBell} />
                    <h3>Push Notifications</h3>
                  </div>

                  <div className="toggle-list">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-label">New Order</span>
                        <span className="toggle-description">Browser notification for new orders</span>
                      </div>
                      <button
                        className={`toggle-button ${notificationSettings.pushNewOrder ? "active" : ""}`}
                        onClick={() => handleToggle(notificationSettings, "pushNewOrder")}
                      >
                        <FontAwesomeIcon icon={notificationSettings.pushNewOrder ? faToggleOn : faToggleOff} />
                      </button>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-label">Low Stock</span>
                        <span className="toggle-description">Browser notification for low stock</span>
                      </div>
                      <button
                        className={`toggle-button ${notificationSettings.pushLowStock ? "active" : ""}`}
                        onClick={() => handleToggle(notificationSettings, "pushLowStock")}
                      >
                        <FontAwesomeIcon icon={notificationSettings.pushLowStock ? faToggleOn : faToggleOff} />
                      </button>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-label">Daily Summary</span>
                        <span className="toggle-description">Daily summary of store activity</span>
                      </div>
                      <button
                        className={`toggle-button ${notificationSettings.pushDailySummary ? "active" : ""}`}
                        onClick={() => handleToggle(notificationSettings, "pushDailySummary")}
                      >
                        <FontAwesomeIcon icon={notificationSettings.pushDailySummary ? faToggleOn : faToggleOff} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="notification-group">
                  <div className="group-header">
                    <FontAwesomeIcon icon={faGlobe} />
                    <h3>Marketing</h3>
                  </div>

                  <div className="toggle-list">
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <span className="toggle-label">Marketing Emails</span>
                        <span className="toggle-description">Receive tips, updates, and promotions</span>
                      </div>
                      <button
                        className={`toggle-button ${notificationSettings.marketingEmails ? "active" : ""}`}
                        onClick={() => handleToggle(notificationSettings, "marketingEmails")}
                      >
                        <FontAwesomeIcon icon={notificationSettings.marketingEmails ? faToggleOn : faToggleOff} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Security Settings</h2>
                <p>Manage your password and security preferences</p>
              </div>

              <form className="settings-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-input">
                    <input
                      type={securitySettings.showPasswords ? "text" : "password"}
                      value={securitySettings.currentPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setSecuritySettings({ ...securitySettings, showPasswords: !securitySettings.showPasswords })}
                    >
                      <FontAwesomeIcon icon={securitySettings.showPasswords ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type={securitySettings.showPasswords ? "text" : "password"}
                      value={securitySettings.newPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type={securitySettings.showPasswords ? "text" : "password"}
                      value={securitySettings.confirmPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <FontAwesomeIcon icon={faSave} />
                    Update Password
                  </button>
                </div>
              </form>

              <div className="security-extra">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <span className="toggle-label">Two-Factor Authentication</span>
                    <span className="toggle-description">Add an extra layer of security to your account</span>
                  </div>
                  <button
                    className={`toggle-button ${securitySettings.twoFactorAuth ? "active" : ""}`}
                    onClick={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
                  >
                    <FontAwesomeIcon icon={securitySettings.twoFactorAuth ? faToggleOn : faToggleOff} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === "payments" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Payment Settings</h2>
                <p>Configure payment methods and tax settings</p>
              </div>

              <form className="settings-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="form-group">
                  <label>Accepted Payment Methods</label>
                  <div className="checkbox-group">
                    {["Credit Card", "PayPal", "Apple Pay", "Google Pay", "Bank Transfer"].map((method) => (
                      <label key={method} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={paymentSettings.acceptedPayments.includes(method)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPaymentSettings({
                                ...paymentSettings,
                                acceptedPayments: [...paymentSettings.acceptedPayments, method],
                              });
                            } else {
                              setPaymentSettings({
                                ...paymentSettings,
                                acceptedPayments: paymentSettings.acceptedPayments.filter((m) => m !== method),
                              });
                            }
                          }}
                        />
                        <span className="checkmark"></span>
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tax Rate (%)</label>
                    <input
                      type="number"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Free Shipping Threshold ($)</label>
                    <input
                      type="number"
                      value={paymentSettings.freeShippingThreshold}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, freeShippingThreshold: e.target.value })}
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <FontAwesomeIcon icon={faSave} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;

