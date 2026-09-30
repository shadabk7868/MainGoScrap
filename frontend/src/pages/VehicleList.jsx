import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VehicleList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [clientType, setClientType] = useState("all");
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "https://maingoscrap.onrender.com/api/vehicles"
      );

      setVehicles(response.data.vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const search = searchTerm.toLowerCase();

    const isBroker = vehicle.isBroker === true;

    // Client Type Filter
    if (clientType === "normal" && isBroker) {
      return false;
    }

    if (clientType === "broker" && !isBroker) {
      return false;
    }

    // Search Filter
    return (
      vehicle.vehicleNumber?.toLowerCase().includes(search) ||
      vehicle.partyName?.toLowerCase().includes(search) ||
      vehicle.brokerName?.toLowerCase().includes(search) ||
      vehicle.mobile?.includes(searchTerm) ||
      vehicle.brokerMobile?.includes(searchTerm)
    );
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="vehicle-list-container">
      <div className="header">
        <h1>Vehicle List</h1>

        <div className="vehicle-list-filters">
          {/* Search */}
          <input
            type="text"
            placeholder="Search Vehicle, Client, Bichwan or Mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />

          {/* Client Type Filter */}
          <select
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
            className="client-filter"
          >
            <option value="all">All Vehicles</option>
            <option value="normal">Normal Client</option>
            <option value="broker">Bichwan</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Vehicle No</th>
              <th>Client Type</th>
              <th>Client Name</th>
              <th>Mobile</th>
              <th>Company</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.map((vehicle) => {
              const isBroker = vehicle.isBroker === true;

              return (
                <tr key={vehicle._id}>
                  <td>{vehicle.vehicleNumber}</td>

                  <td>
                    {isBroker ? "Bichwan" : "Normal Client"}
                  </td>

                  <td>
                    {isBroker
                      ? vehicle.brokerName || "-"
                      : vehicle.partyName || "-"}
                  </td>

                  <td>
                    {isBroker
                      ? vehicle.brokerMobile || "-"
                      : vehicle.mobile || "-"}
                  </td>

                  <td>{vehicle.company}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/vehicle/${vehicle._id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredVehicles.length === 0 && (
              <tr>
                <td colSpan="6">
                  No Vehicles Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleList;

