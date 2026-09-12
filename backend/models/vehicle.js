const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    // Party Details
    partyName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    alternateMobile: {
      type: String,
      default: "",
      match: /^[0-9]{10}$/,
    },

    aadhaarNumber: {
      type: String,
      default: "",
      match: /^[0-9]{12}$/,
    },

    aadhaarPhoto: {
  type: String,
  default: "",
},
    address: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    // Vehicle Details
    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      default: "",
      trim: true,
    },

    engineNumber: {
      type: String,
      default: "",
      uppercase: true,
      trim: true,
    },

    chassisNumber: {
      type: String,
      default: "",
      uppercase: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      default: "",
      trim: true,
    },

    // Purchase Details
    purchaseAmount: {
      type: Number,
      default: 0,
    },

    paymentMode: {
      type: String,
      default: "Cash",
      enum: ["Cash", "Online", "Cheque"],
    },

    status: {
      type: String,
      default: "Purchased",
      enum: ["Purchased", "Scrapped"],
    },

    notes: {
      type: String,
      default: "",
    },

    // Images
    vehiclePhoto: {
      type: String,
      default: "",
    },

    rcPhoto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);