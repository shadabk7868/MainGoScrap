import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VehicleList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vehicles"
      );

      setVehicles(response.data.vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vehicleNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vehicle.partyName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vehicle.mobile?.includes(searchTerm)
  );

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="vehicle-list-container">
      <div className="header">
        <h1>Vehicle List</h1>

        <input
          type="text"
          placeholder="Search Vehicle, Party Name or Mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Vehicle No</th>
            <th>Party Name</th>
            <th>Mobile</th>
            <th>Company</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {filteredVehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicleNumber}</td>
              <td>{vehicle.partyName}</td>
              <td>{vehicle.mobile}</td>
              <td>{vehicle.company}</td>
              <td>{vehicle.status}</td>

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
          ))}

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