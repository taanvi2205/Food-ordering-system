import multer from "multer";

// ⚠️ Add `destination` to store uploaded files temporarily
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ⬅️ folder to save the image locally
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // avoid name conflicts
  }
});

const upload = multer({ storage });

export default upload;
