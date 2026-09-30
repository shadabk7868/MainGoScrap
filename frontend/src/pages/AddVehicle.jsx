import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddVehicle() {
  const navigate = useNavigate();
  const [isBroker, setIsBroker] = useState(false);
const [brokerAadhaarPhoto, setBrokerAadhaarPhoto] = useState(null);
  const [vehiclePhoto, setVehiclePhoto] = useState(null);
  const [rcPhoto, setRcPhoto] = useState(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);

  const [formData, setFormData] = useState({
    isBroker: false,
    partyName: "",
    mobile: "",
    aadhaarNumber: "",
    address: "",

    brokerName: "",
brokerMobile: "",
brokerAadhaar: "",
brokerAddress: "",
commission: 0,

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

    if (
  name === "mobile" ||
  name === "aadhaarNumber" ||
  name === "brokerMobile" ||
  name === "brokerAadhaar"
) {
  value = value.replace(/\D/g, "");
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

    setFormData({
      ...formData,
      [name]: value,
    });
  };


const uploadImage = async (file) => {
  const data = new FormData();

  data.append("image", file);

  const response = await axios.post(
    "https://maingoscrap.onrender.com/api/upload/image",
    data
  );

  return {
    imageUrl: response.data.imageUrl,
    publicId: response.data.publicId,
  };
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
  formData.mobile &&
  formData.mobile.length !== 10
) {
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

    if (
  formData.brokerMobile &&
  formData.brokerMobile.length !== 10
) {
  alert("Broker Mobile must be 10 digits");
  return;
}

if (
  formData.brokerAadhaar &&
  formData.brokerAadhaar.length !== 12
) {
  alert("Broker Aadhaar must be 12 digits");
  return;
}

    try {
let vehiclePhotoData = {
  imageUrl: "",
  publicId: "",
};

let rcPhotoData = {
  imageUrl: "",
  publicId: "",
};

let aadhaarPhotoData = {
  imageUrl: "",
  publicId: "",
};

let brokerAadhaarPhotoData = {
  imageUrl: "",
  publicId: "",
};


    
if (vehiclePhoto) {
  vehiclePhotoData = await uploadImage(vehiclePhoto);
}

if (rcPhoto) {
  rcPhotoData = await uploadImage(rcPhoto);
}

if (aadhaarPhoto) {
  aadhaarPhotoData = await uploadImage(aadhaarPhoto);
}

if (brokerAadhaarPhoto) {
  brokerAadhaarPhotoData =
    await uploadImage(brokerAadhaarPhoto);
}



if (brokerAadhaarPhoto) {
  brokerAadhaarPhotoUrl =
    await uploadImage(brokerAadhaarPhoto);
}

      const response = await axios.post(
  "https://maingoscrap.onrender.com/api/vehicles",
  {
    ...formData,
    commission: formData.commission === ""
      ? 0
      : Number(formData.commission),

vehiclePhoto: vehiclePhotoData.imageUrl,
vehiclePhotoPublicId: vehiclePhotoData.publicId,

rcPhoto: rcPhotoData.imageUrl,
rcPhotoPublicId: rcPhotoData.publicId,

aadhaarPhoto: aadhaarPhotoData.imageUrl,
aadhaarPhotoPublicId: aadhaarPhotoData.publicId,

brokerAadhaarPhoto: brokerAadhaarPhotoData.imageUrl,
brokerAadhaarPhotoPublicId:
  brokerAadhaarPhotoData.publicId,


  }
);

      navigate("/dashboard");

      console.log(response.data);

      setFormData({
        isBroker: false,
        partyName: "",
        mobile: "",
        aadhaarNumber: "",
        address: "",
        brokerName: "",
brokerMobile: "",
brokerAadhaar: "",
brokerAddress: "",
commission: 0,

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
      setAadhaarPhoto(null);
      setBrokerAadhaarPhoto(null);
      setIsBroker(false);

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
            <label>Party Name</label>
            <input
              type="text"
              name="partyName"
              value={formData.partyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength={10}
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

          <div className="form-group checkbox-group">
  <label>
    <input
      type="checkbox"
      checked={isBroker}
      onChange={(e) => {
  const checked = e.target.checked;

  setIsBroker(checked);

  if (!checked) {
    setFormData({
      ...formData,
      isBroker: false,
      brokerName: "",
      brokerMobile: "",
      brokerAadhaar: "",
      brokerAddress: "",
      commission: "",
    });

    setBrokerAadhaarPhoto(null);
  } else {
    setFormData({
      ...formData,
      isBroker: true,
    });
  }
}}
    />
    Vehicle is from Bichwan (Broker) 
  </label>
</div>

{isBroker && (
  <>
    <h2>Bichwan Details</h2>

    <div className="form-group">
  <label>Bichwan Name</label>
  <input
    type="text"
    name="brokerName"
    value={formData.brokerName}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label>Mobile Number</label>
  <input
    type="text"
    name="brokerMobile"
    value={formData.brokerMobile}
    onChange={handleChange}
    maxLength={10}
  />
</div>

<div className="form-group">
  <label>Aadhaar Number</label>
  <input
    type="text"
    name="brokerAadhaar"
    value={formData.brokerAadhaar}
    onChange={handleChange}
    maxLength={12}
  />
</div>

<div className="form-group">
  <label>Address</label>
  <textarea
    name="brokerAddress"
    value={formData.brokerAddress}
    onChange={handleChange}
    rows="3"
  />
</div>

<div className="form-group">
  <label>Commission</label>
  <input
    type="number"
    name="commission"
    value={formData.commission}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label>Bichwan A/S Photo</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setBrokerAadhaarPhoto(e.target.files[0])
    }
  />

  {brokerAadhaarPhoto && (
    <p>
      Selected: {brokerAadhaarPhoto.name}
    </p>
  )}
</div>
  </>
)}

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
  <label>A/S Photo</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setAadhaarPhoto(e.target.files[0])
    }
  />

  {aadhaarPhoto && (
    <p>Selected: {aadhaarPhoto.name}</p>
  )}
</div>

          {/* <div className="form-group">
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
          </div> */}

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