const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// TEST ROUTE
router.get("/test", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


router.post(
  "/image",
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;

      console.log(req.file);
      const base64 = Buffer.from(
        file.buffer
      ).toString("base64");

      const dataURI =
        `data:${file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(
  dataURI,
  {
    folder: "goscrap",
    resource_type: "image",
  }
);

console.log(result.secure_url);
      res.json({
        success: true,
        imageUrl: result.secure_url,
      });
    } catch (error) {
  console.log("UPLOAD ERROR:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
  console.log("FULL ERROR:", error);
}
  }
);

module.exports = router;