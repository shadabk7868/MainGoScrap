import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    partyName: "",
    mobile: "",
    aadhaarNumber: "",
    address: "",
    vehicleNumber: "",
    company: "",
    model: "",
    color: "",
    engineNumber: "",
    chassisNumber: "",
    status: "Purchased",
  });

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        `https://maingoscrap.onrender.com/api/vehicles/${id}`
      );

      setFormData({
        partyName: response.data.vehicle.partyName || "",
        mobile: response.data.vehicle.mobile || "",
        aadhaarNumber:
          response.data.vehicle.aadhaarNumber || "",
        address: response.data.vehicle.address || "",
        vehicleNumber:
          response.data.vehicle.vehicleNumber || "",
        company: response.data.vehicle.company || "",
        model: response.data.vehicle.model || "",
        color: response.data.vehicle.color || "",
        engineNumber:
          response.data.vehicle.engineNumber || "",
        chassisNumber:
          response.data.vehicle.chassisNumber || "",
        status:
          response.data.vehicle.status || "Purchased",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "partyName") {
      value = value
        .toLowerCase()
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );
    }

    if (
      name === "vehicleNumber" ||
      name === "engineNumber" ||
      name === "chassisNumber"
    ) {
      value = value.toUpperCase();
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `https://maingoscrap.onrender.com/api/vehicles/${id}`,
      formData
    );

    // alert("Vehicle Updated Successfully");

    navigate(`/vehicle/${id}`, {
      replace: true,
    });

  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};

  return (
    <div className="vehicle-container">
      <div className="vehicle-form">
        <h1>Edit Vehicle Details</h1>
<p className="page-subtitle">
  Update vehicle and owner information
</p>

<div className="form-grid">

<form onSubmit={handleSubmit}>

  <h2>Party Details</h2>

  <div className="form-group">
    <label>Party Name *</label>
    <input
      type="text"
      name="partyName"
      value={formData.partyName}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Mobile Number *</label>
    <input
      type="tel"
      name="mobile"
      value={formData.mobile}
      onChange={handleChange}
      maxLength={10}
      pattern="[0-9]{10}"
      required
    />
  </div>

  <div className="form-group">
    <label>Aadhaar Number</label>
    <input
      type="text"
      name="aadhaarNumber"
      value={formData.aadhaarNumber}
      onChange={handleChange}
      maxLength={12}
      pattern="[0-9]{12}"
    />
  </div>

  <div className="form-group">
    <label>Address</label>
    <textarea
      name="address"
      value={formData.address}
      onChange={handleChange}
      rows="3"
    />
  </div>
  <h2>Vehicle Details</h2>

<div className="form-group">
  <label>Vehicle Number *</label>
  <input
    type="text"
    name="vehicleNumber"
    value={formData.vehicleNumber}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label>Company *</label>
  <input
    type="text"
    name="company"
    value={formData.company}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label>Model *</label>
  <input
    type="text"
    name="model"
    value={formData.model}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label>Color</label>
  <input
    type="text"
    name="color"
    value={formData.color}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label>Engine Number</label>
  <input
    type="text"
    name="engineNumber"
    value={formData.engineNumber}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label>Chassis Number</label>
  <input
    type="text"
    name="chassisNumber"
    value={formData.chassisNumber}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label>Status</label>
  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="Purchased">Purchased</option>
    <option value="Scrapped">Scrapped</option>
  </select>
</div>

<div className="form-buttons">

  <button
  type="button"
  className="cancel-btn"
  onClick={() =>
    navigate(`/vehicle/${id}`, {
      replace: true,
    })
  }
>
  Cancel
</button>

  <button
    type="submit"
    className="save-btn-update"
  >
    Update Vehicle
  </button>

</div>
</form>
          {/* All form-group here */}

</div>
      </div>
    </div>
  );
}

export default EditVehicle;