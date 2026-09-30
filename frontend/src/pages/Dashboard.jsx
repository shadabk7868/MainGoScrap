import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import Carcard from "../assets/Carcard.jpeg"

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalVehicles: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "https://maingoscrap.onrender.com/api/vehicles/stats/dashboard"
      );

      setStats({
        totalVehicles: response.data.totalVehicles || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard-layout">

      {/* Mobile Menu Button */}
      <button
        className="toggle-btn-fixed"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-menu">

          <button onClick={() => navigate("/add-vehicle")}>
            + Add Vehicle
          </button>

          <button onClick={() => navigate("/vehicles")}>
            Vehicle List
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header">

          <div className="logo-section">
            <img src={logo} alt="GoScrap logo" />
            <h2>GoScrap</h2>
          </div>

          <button
            className="header-add-btn"
            onClick={() => navigate("/add-vehicle")}
          >
            + Add Vehicle
          </button>

        </div>

        {/* Welcome */}
        <div className="dashboard-welcome">
          <h2>Welcome Sheikh Imroz !!</h2>
          <p>Vehicle Management Dashboard</p>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">

          {/* Total Vehicles */}
          <div
            className="card dashboard-action-card total-card"
            onClick={() => navigate("/vehicles")}
          >
            <h3>Total Vehicles</h3>
            <p>{stats.totalVehicles}</p>
          </div>

          {/* Go To Vehicle List */}
          <div
            className="card dashboard-action-card list-card"
            style={{
                backgroundImage: `url(${Carcard})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            onClick={() => navigate("/vehicles")}
            
          >
            {/* <h3>Go To Vehicle List</h3> */}
            <p>View All Vehicles →</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

