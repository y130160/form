// טוען משתנים מהקובץ .env
require('dotenv').config();

// טוענים את Express ו-Axios
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// יצירת מסלול (endpoint) לקבלת רשימת תלמידים מ-Airtable
app.get('/api/students', async (req, res) => {
  try {
    // קריאה למשתנים מתוך הקובץ .env
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME;
    const airtableToken = process.env.AIRTABLE_TOKEN;
    const airtableFieldName = process.env.AIRTABLE_FIELD_NAME;

    // קריאה ל-Airtable בעזרת Axios
    const response = await axios.get(
      `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}?sort[0][field]=${encodeURIComponent(airtableFieldName)}`,
      {
        headers: {
          Authorization: `Bearer ${airtableToken}`
        }
      }
    );

    // שליחת הנתונים חזרה לדפדפן
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
