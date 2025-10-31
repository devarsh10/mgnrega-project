// Main Application Logic

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize district dropdown
    initializeDistrictDropdown();

    // Get form element
    const form = document.getElementById('districtForm');

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const state = document.getElementById('stateSelect').value;
        const district = document.getElementById('districtSelect').value;
        const finYear = document.getElementById('finYearSelect').value;

        // Validate district selection
        if (!district) {
            showError('Please select a district / कृपया जिला चुनें');
            return;
        }

        // Hide any previous errors
        hideError();

        // Show modal and loading spinner
        showModal();
        showLoading();

        try {
            // Fetch data from API
            const data = await fetchDistrictData(state, district, finYear);
            
            // Display the data
            displayData(data);
        } catch (error) {
            // Display error in modal
            displayError(error.message);
        }
    });
});

// Log application start
console.log('MGNREGA Dashboard initialized successfully');