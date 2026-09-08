import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddVehicle() {
  const navigate = useNavigate();
  const [vehiclePhoto, setVehiclePhoto] = useState(null);
  const [rcPhoto, setRcPhoto] = useState(null);

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

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "partyName") {
      value = value
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    if (name === "vehicleNumber") {
      value = value.toUpperCase();
    }

    if (
      name === "engineNumber" ||
      name === "chassisNumber"
    ) {
      value = value.toUpperCase();
    }

    if (
      name === "mobile" ||
      name === "aadhaarNumber"
    ) {
      value = value.replace(/\D/g, "");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const uploadImage = async (file) => {
    const data = new FormData();

    data.append("image", file);

    const response = await axios.post(
      "http://localhost:5000/api/upload/image",
      data
    );

    return response.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      alert("Mobile Number must be 10 digits");
      return;
    }

    if (
      formData.aadhaarNumber &&
      formData.aadhaarNumber.length !== 12
    ) {
      alert("Aadhaar Number must be 12 digits");
      return;
    }

    try {
      let vehiclePhotoUrl = "";
      let rcPhotoUrl = "";

      if (vehiclePhoto) {
        vehiclePhotoUrl =
          await uploadImage(vehiclePhoto);
      }

      if (rcPhoto) {
        rcPhotoUrl =
          await uploadImage(rcPhoto);
      }

      const response = await axios.post(
        "http://localhost:5000/api/vehicles",
        {
          ...formData,
          vehiclePhoto: vehiclePhotoUrl,
          rcPhoto: rcPhotoUrl,
        }
      );

      navigate("/dashboard");

      console.log(response.data);

      setFormData({
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

      setVehiclePhoto(null);
      setRcPhoto(null);

    } catch (error) {
      console.log(error);
      alert("Error Adding Vehicle");
    }
  };

  return (
    <div className="vehicle-container">
      <div className="vehicle-form">
        <h1>Add Vehicle</h1>

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
              placeholder="12 Digit Aadhaar"
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
            <label>Vehicle Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setVehiclePhoto(e.target.files[0])
              }
            />
            {vehiclePhoto && (
              <p>Selected: {vehiclePhoto.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>RC Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setRcPhoto(e.target.files[0])
              }
            />
            {rcPhoto && (
              <p>Selected: {rcPhoto.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="status-select"
            >
              <option value="Purchased">
                Purchased
              </option>

              <option value="Scrapped">
                Scrapped
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="save-btn"
          >
            Save Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;