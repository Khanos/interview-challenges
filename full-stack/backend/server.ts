import express from 'express';
import cors from 'cors';
import multer from 'multer';
import csvToJson from 'convert-csv-to-json';

import DataBase from './database';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const PORT = process.env.PORT || 3000;
const app = express();

// Adding middlewares
app.use(cors());

// Adding routes
app.post('/api/files', upload.single('file'), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(500).json({
      message: 'Please upload a file'
    });
  }

  if(file.mimetype !== 'text/csv') {
    return res.status(500).json({
      message: 'Please upload a CSV file'
    });
  }

  try {
    const bufferString = file.buffer.toString('utf8');
    const jsonArray = await csvToJson.csvStringToJson(bufferString);
    jsonArray.forEach((data) => {
      DataBase.push(data);
    });
    return res.status(200).json({
      data: jsonArray,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while processing the file'
    });
  }

  
  res.status(200).json({
    data: [],
    message: 'Hello World!'
  });
});

// init the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});