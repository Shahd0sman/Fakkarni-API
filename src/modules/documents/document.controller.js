// const documentService = require("./document.service");
// const asyncHandler = require("../../utils/asyncHandler");

// async function createDocument(req, res) {
//   const documentData = {
//     ...req.body,
//     filePath: req.file ? `uploads/documents/${req.file.filename}` : null,
//   };

//   const document = await documentService.createDocument(
//     req.user.id,
//     documentData,
//   );

//   res.status(201).json({
//     success: true,
//     message: "Document created successfully",
//     data: document,
//   });
// }

// async function getMyDocuments(req, res) {
//   const documents = await documentService.getMyDocuments(req.user.id);

//   res.status(200).json({
//     success: true,
//     results: documents.length,
//     data: documents,
//   });
// }

// async function updateDocument(req, res) {
//   const updateData = {
//     ...req.body,
//   };

//   if (req.file) {
//     updateData.filePath = `uploads/documents/${req.file.filename}`;
//   }

//   const document = await documentService.updateDocument(
//     req.user.id,
//     Number(req.params.id),
//     updateData,
//   );

//   res.status(200).json({
//     success: true,
//     message: "Document updated successfully",
//     data: document,
//   });
// }

// async function deleteDocument(req, res) {
//   await documentService.deleteDocument(req.user.id, Number(req.params.id));

//   res.status(200).json({
//     success: true,
//     message: "Document deleted successfully",
//   });
// }

// module.exports = {
//   createDocument: asyncHandler(createDocument),
//   getMyDocuments: asyncHandler(getMyDocuments),
//   updateDocument: asyncHandler(updateDocument),
//   deleteDocument: asyncHandler(deleteDocument),
// };
const documentService = require("./document.service");
const asyncHandler = require("../../utils/asyncHandler");
const { uploadBuffer } = require("../../config/cloudinary");

async function createDocument(req, res) {
  let filePath = null;

  if (req.file) {
    const result = await uploadBuffer(req.file.buffer);
    filePath = result.secure_url;
  }

  const documentData = {
    ...req.body,
    filePath,
  };

  const document = await documentService.createDocument(
    req.user.id,
    documentData,
  );

  res.status(201).json({
    success: true,
    message: "Document created successfully",
    data: document,
  });
}

async function getMyDocuments(req, res) {
  const documents = await documentService.getMyDocuments(req.user.id);

  res.status(200).json({
    success: true,
    results: documents.length,
    data: documents,
  });
}

async function updateDocument(req, res) {
  const updateData = {
    ...req.body,
  };

  if (req.file) {
    const result = await uploadBuffer(req.file.buffer);
    updateData.filePath = result.secure_url;
  }

  const document = await documentService.updateDocument(
    req.user.id,
    Number(req.params.id),
    updateData,
  );

  res.status(200).json({
    success: true,
    message: "Document updated successfully",
    data: document,
  });
}

async function deleteDocument(req, res) {
  await documentService.deleteDocument(req.user.id, Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "Document deleted successfully",
  });
}

module.exports = {
  createDocument: asyncHandler(createDocument),
  getMyDocuments: asyncHandler(getMyDocuments),
  updateDocument: asyncHandler(updateDocument),
  deleteDocument: asyncHandler(deleteDocument),
};