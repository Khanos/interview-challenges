import express, { query } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import csvToJson from 'convert-csv-to-json';
import { CsvData, UserData } from './types';

import DataBase from './database';

const storage = multer.memoryStorage()
const upload = multer({ storage })
const PORT = process.env.PORT || 3000;
const app = express();

// Adding middlewares
app.use(cors());
app.use(bodyParser.json());

// Adding routes
app.post('/api/files', upload.single('file'), async (req, res, next) => {
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
    const jsonArray = await csvToJson.csvStringToJson(bufferString) as CsvData[];
    jsonArray.forEach((data) => {
      const values = Object.values(data)[0].split(',');
      const userData: UserData = {
        Index: Number(values[0]),
        CustomerName: values[1],
        FirstName: values[2],
        LastName: values[3],
        Company: values[4],
        City: values[5],
        Country: values[6],
        Phone1: values[7],
        Phone2: values[8],
        Email: values[9],
        SubscriptionDate: values[10],
        Website: values[11]
      };
      DataBase.push(userData);
    });
    return res.status(200).json({
      data: DataBase,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while processing the file'
    });
  }
});

app.get('/api/users', (req, res) => {
  const { q } = req.query;
  if(!q) {
    return res.status(500).json({
      message: 'Please provide a query parameter'
    });
  }
  if(Array.isArray(q)) {
    return res.status(500).json({
      message: 'Please provide a single query parameter'
    });
  };
  const search = q?.toString().toLowerCase();
  const result = DataBase.filter((row: any) => {
    return Object.values(row).some((value: any) => {
      if(typeof value === 'number') {
        return value.toString().includes(search);
      }
      return value.toString().toLowerCase().includes(search);
    });
  });

  return res.status(200).json({
    data: result,
    message: `Search results from ${search}`
  });
});

// init the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});