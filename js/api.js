// API Functions

/**
 * Fetch district data from the MGNREGA API
 * @param {string} state - State name
 * @param {string} district - District name
 * @param {string} finYear - Financial year
 * @returns {Promise<Array>} Array of records
 */
async function fetchDistrictData(state, district, finYear) {
    const url = `${CONFIG.API_BASE_URL}?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&finYear=${encodeURIComponent(finYear)}`;
    
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.records || result.records.length === 0) {
            throw new Error('No data found for the selected district and financial year');
        }
        
        return result.records;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data. Please try again later.');
    }
}