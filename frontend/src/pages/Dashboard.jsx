import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
// import Bg from "../assets/Dashboardbg.jpg";

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalVehicles: 0,
    purchasedVehicles: 0,
    scrappedVehicles: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vehicles/stats/dashboard"
      );

      setStats(response.data);
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

      <button
    className="toggle-btn-fixed"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    ☰
  </button>

  {sidebarOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setSidebarOpen(false)}
  ></div>
)}

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

        <div className="dashboard-header">

          <div className="logo-section">
            <img src={logo} alt="logo" />
            <h2>GoScrap</h2>
          </div>

          <button
    className="header-add-btn"
    onClick={() => navigate("/add-vehicle")}
  >
    + Add Vehicle
  </button>
          {/* <div className="welcome-section">
            <h3>Welcome Sheikh Imroz!!</h3>
          </div> */}

        </div>

        <div className="dashboard-welcome">
  <h2>Welcome Sheikh Imroz !!</h2>
  <p>Vehicle Management Dashboard</p>
</div>

        <div className="dashboard-cards">

  <div
    className="card total-card"
    onClick={() => navigate("/vehicles")}
  >
    <h3>Total Vehicles</h3>
    <p>{stats.totalVehicles}</p>
  </div>

  <div
    className="card purchase-card"
    onClick={() => navigate("/vehicles?status=Purchased")}
  >
    <h3>Purchased Vehicles</h3>
    <p>{stats.purchasedVehicles}</p>
  </div>

  <div
    className="card scrap-card"
    onClick={() => navigate("/vehicles?status=Scrapped")}
  >
    <h3>Scrapped Vehicles</h3>
    <p>{stats.scrappedVehicles}</p>
  </div>

</div>

      </div>

    </div>
  );
}

export default Dashboard;