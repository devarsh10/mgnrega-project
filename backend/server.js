require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API endpoint to fetch district data
app.get('/api/district-performance', async (req, res) => {
    const { state, district, finYear } = req.query;
    
    if (!state || !district || !finYear) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const url = `https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=${process.env.DATA_GOV_API_KEY}&format=json&filters[state_name]=${encodeURIComponent(state)}&filters[fin_year]=${encodeURIComponent(finYear)}&filters[district_name]=${encodeURIComponent(district)}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});