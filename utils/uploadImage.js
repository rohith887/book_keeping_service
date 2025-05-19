// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// const bucket = require('./firebase');  // Your Firebase storage instance

// // Multer memory storage
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
//   fileFilter: (req, file, cb) => {
//     const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only .jpg, .jpeg, or .png files are allowed"));
//     }
//   }
// });

// // Firebase upload function
// const uploadImageToFirebase = async (file, folder = 'images') => {
//   return new Promise((resolve, reject) => {
//     const fileName = `${folder}/${uuidv4()}_${file.originalname.replace(/\s+/g, '_')}`;
//     const blob = bucket.file(fileName);
//     const blobStream = blob.createWriteStream({
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     blobStream.on('error', (err) => reject(err));

//     blobStream.on('finish', async () => {
//       try {
//         await blob.makePublic();
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//         resolve(publicUrl);
//       } catch (err) {
//         reject('Upload succeeded, but making public failed: ' + err);
//       }
//     });

//     blobStream.end(file.buffer);
//   });
// };

// // Generic middleware factory for any single file field
// const handleSingleFileUpload = (fieldName, folder = 'images') => {
//   const singleUpload = upload.single(fieldName);

//   return async (req, res, next) => {
//     singleUpload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ success: false, message: err.message });
//       }
//       if (!req.file) {
//         // No file uploaded
//         return next();
//       }
//       try {
//         const publicUrl = await uploadImageToFirebase(req.file, folder);
//         // Attach the public URL to req for downstream use, e.g. req.uploadedFileUrl
//         req.uploadedFileUrl = publicUrl;
//         next();
//       } catch (uploadError) {
//         return res.status(500).json({ success: false, message: uploadError.toString() });
//       }
//     });
//   };
// };

// module.exports = {
//   handleSingleFileUpload,
// };
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;
  if (file.fieldname === "Image") {
      uploadDir = "uploads/images";
    }
     // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${uniqueSuffix}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB Limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, or .png files are allowed"));
    }
  }
});

const handleImageUpload = upload.single("Image");

module.exports = {
  handleImageUpload
}