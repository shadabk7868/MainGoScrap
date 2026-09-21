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

    //broker
    // Broker Details
brokerName: {
  type: String,
  default: "",
  trim: true,
},

brokerMobile: {
  type: String,
  default: "",
  validate: {
    validator: function (v) {
      return v === "" || /^[0-9]{10}$/.test(v);
    },
    message: "Broker Mobile must be 10 digits",
  },
},

brokerAadhaar: {
  type: String,
  default: "",
  validate: {
    validator: function (v) {
      return v === "" || /^[0-9]{12}$/.test(v);
    },
    message: "Broker Aadhaar must be 12 digits",
  },
},

brokerAddress: {
  type: String,
  default: "",
  trim: true,
},

brokerAadhaarPhoto: {
  type: String,
  default: "",
},

commission: {
  type: Number,
  default: 0,
},

isBroker: {
  type: Boolean,
  default: false,
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