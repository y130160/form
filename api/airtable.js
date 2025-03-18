// api/airtable.js
export default async function handler(req, res) {
  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN; // קורא את התוקן מהמשתנה הסביבתי
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID; // קורא את מזהה הבסיס
  const AIRTABLE_TABLE_NAME = "משתמשים"; // שם הטבלה

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`
        }
      }
    );
    
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching data from Airtable" });
    }
    
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error("Error in airtable.js handler:", error);
    return res.status(500).json({ error: error.message });
  }
}
