const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadList, getDistributedLists } = require('../controllers/listController');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const fileFilter = (req, file, cb) => {
  const allowed = ['.csv', '.xlsx', '.xls'];
  if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};
const upload = multer({ storage, fileFilter });

router.post('/upload', auth, upload.single('file'), uploadList);
router.get('/', auth, getDistributedLists);

module.exports = router;