import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        `https://maingoscrap.onrender.com/api/vehicles/${id}`
      );

      setVehicle(response.data.vehicle);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://maingoscrap.onrender.com/api/vehicles/${id}`
      );

      // alert("Vehicle Deleted Successfully");
      navigate("/vehicles");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  if (!vehicle) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="vehicle-details">
      <h1>Vehicle Details</h1>

      {/* Party Details */}
      <div className="details-card">
        <h2>Party Information</h2>

        <p>
          <strong>Party Name:</strong> {vehicle.partyName}
        </p>

        <p>
          <strong>Mobile:</strong> {vehicle.mobile}
        </p>

        {/* <p>
          <strong>Alternate Mobile:</strong>{" "}
          {vehicle.alternateMobile || "-"}
        </p> */}

        <p>
          <strong>Aadhaar Number:</strong>{" "}
          {vehicle.aadhaarNumber || "-"}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {vehicle.address || "-"}
        </p>

        {/* <p>
          <strong>City:</strong>{" "}
          {vehicle.city || "-"}
        </p> */}
      </div>

      {/* Vehicle Details */}
      <div className="details-card">
        <h2>Vehicle Information</h2>

        <p>
          <strong>Vehicle Number:</strong>{" "}
          {vehicle.vehicleNumber}
        </p>

        <p>
          <strong>Company:</strong>{" "}
          {vehicle.company}
        </p>

        <p>
          <strong>Model:</strong>{" "}
          {vehicle.model}
        </p>

        <p>
          <strong>Color:</strong>{" "}
          {vehicle.color || "-"}
        </p>

        <p>
          <strong>Engine Number:</strong>{" "}
          {vehicle.engineNumber || "-"}
        </p>

        <p>
          <strong>Chassis Number:</strong>{" "}
          {vehicle.chassisNumber || "-"}
        </p>

        {/* <p>
          <strong>Vehicle Type:</strong>{" "}
          {vehicle.vehicleType || "-"}
        </p> */}

        <p>
          <strong>Status:</strong>{" "}
          {vehicle.status}
        </p>
      </div>

      {/* Purchase Details */}
      {/* <div className="details-card">
        <h2>Purchase Information</h2>

        <p>
          <strong>Purchase Amount:</strong> ₹
          {vehicle.purchaseAmount || 0}
        </p>

        <p>
          <strong>Payment Mode:</strong>{" "}
          {vehicle.paymentMode || "-"}
        </p>

        <p>
          <strong>Notes:</strong>{" "}
          {vehicle.notes || "-"}
        </p>
      </div> */}

      {/* Documents */}
      <div className="details-card">
        <h2>Documents & Images</h2>

        {vehicle.vehiclePhoto && (
          <div style={{ marginBottom: "20px" }}>
            <h3>Vehicle Photo</h3>

            <a
              href={vehicle.vehiclePhoto}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={vehicle.vehiclePhoto}
                alt="Vehicle"
                width="250"
                style={{
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </a>
          </div>
        )}

        {vehicle.rcPhoto && (
          <div>
            <h3>RC Photo</h3>

            <a
              href={vehicle.rcPhoto}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={vehicle.rcPhoto}
                alt="RC"
                width="250"
                style={{
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </a>
          </div>
        )}

        {!vehicle.vehiclePhoto &&
          !vehicle.rcPhoto && (
            <p>No Documents Uploaded</p>
          )}
      </div>

      {/* Dates */}
      <div className="details-card">
        <h2>Record Information</h2>

        <p>
          <strong>Created At:</strong>{" "}
          {new Date(
            vehicle.createdAt
          ).toLocaleString()}
        </p>

        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(
            vehicle.updatedAt
          ).toLocaleString()}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
  className="edit-btn"
  onClick={() =>
    navigate(
      `/edit-vehicle/${vehicle._id}`,
      { replace: true }
    )
  }
>
  Edit Vehicle
</button>
        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete Vehicle
        </button>
      </div>
    </div>
  );
}

export default VehicleDetails;