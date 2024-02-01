// pages/api/capture.js
import fs from 'fs';

export default function handler(req, res) {
  const { imageSrc } = req.body;

  if (imageSrc) {
    try {
      // Save imageSrc to a variable (you can save it to a file on the server side if needed)
      const dataToSave = { imageSrc };

      // You can save the data to a file on the server side here if needed
      // fs.writeFileSync('capturedData.json', JSON.stringify(dataToSave), 'utf-8');

      console.log('Data saved:', dataToSave);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ success: false, error: 'Invalid data' });
  }
}
