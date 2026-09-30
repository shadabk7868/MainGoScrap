const Vehicle = require("../models/vehicle.js");
const cloudinary = require("../config/cloudinary");

const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      vehicle,
    });


  } catch (error) {

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        success: true,
        message: "Login Successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
      new: true,
      runValidators: true,
    }
    );

    res.status(200).json({
      success: true,
      vehicle,
    });
 } catch (error) {

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

const deleteVehicle = async (req, res) => {
  try {
    // First find the vehicle
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    }

    // Collect all Cloudinary public IDs
    const publicIds = [
      vehicle.vehiclePhotoPublicId,
      vehicle.rcPhotoPublicId,
      vehicle.aadhaarPhotoPublicId,
      vehicle.brokerAadhaarPhotoPublicId,
    ].filter(Boolean);

    // Delete images from Cloudinary
    for (const publicId of publicIds) {
      try {
        const result = await cloudinary.uploader.destroy(
          publicId,
          {
            resource_type: "image",
            invalidate: true,
          }
        );

        console.log(
          `Cloudinary delete: ${publicId}`,
          result
        );
      } catch (cloudinaryError) {
        console.log(
          `Cloudinary delete failed: ${publicId}`,
          cloudinaryError.message
        );
      }
    }

    // Delete vehicle from MongoDB
    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Vehicle and images deleted successfully",
    });
  } catch (error) {
    console.log("DELETE VEHICLE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getDashboardStats = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();

    const purchasedVehicles =
      await Vehicle.countDocuments({
        status: "Purchased",
      });

    const scrappedVehicles =
      await Vehicle.countDocuments({
        status: "Scrapped",
      });

    res.status(200).json({
      success: true,
      totalVehicles,
      purchasedVehicles,
      scrappedVehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = { createVehicle ,getVehicles ,login ,getVehicleById ,updateVehicle ,deleteVehicle ,getDashboardStats};