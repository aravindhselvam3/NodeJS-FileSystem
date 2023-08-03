const express = require('express');
const fs = require('fs');
const cors = require('cors');


const app = express();
const port = 3001;
app.use(cors());
// API endpoint to create a text file with the current timestamp
app.get('/', (req, res) => {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const content = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const filename = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}.txt`;

  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      res.status(500).send('Error creating file');
    } else {
      console.log('File created successfully:', filename);
      res.status(200).send('File created successfully');
    }
  });
});

// API endpoint to retrieve all the text files in the particular folder
app.get('/text', (req, res) => {
  const folderPath = '/'; 
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading folder');
    } else {
    //   console.log('Files in the folder:', files);
      res.status(200).json({files});
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
