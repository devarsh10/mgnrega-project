// UI Functions

// DOM Elements
const modal = document.getElementById('resultModal');
const closeModalBtn = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const districtSelect = document.getElementById('districtSelect');

/**
 * Initialize district dropdown
 */
function initializeDistrictDropdown() {
    MAHARASHTRA_DISTRICTS.forEach(district => {
        const option = document.createElement('option');
        option.value = district.value;
        option.textContent = district.label;
        districtSelect.appendChild(option);
    });
}

/**
 * Display data in tabular format
 * @param {Array} records - Array of data records
 */
function displayData(records) {
    hideLoading();
    modalContent.innerHTML = '';

    // Create table container with horizontal scroll
    const tableContainer = document.createElement('div');
    tableContainer.className = 'overflow-x-auto';

    // Create table
    const table = document.createElement('table');
    table.className = 'min-w-full bg-white border border-gray-300';

    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'bg-blue-600 text-white';
    const headerRow = document.createElement('tr');

    // Get all keys from first record and filter to show only defined fields
    const allKeys = Object.keys(records[0]);
    const keys = allKeys.filter(key => FIELD_LABELS.hasOwnProperty(key));

    keys.forEach(key => {
        const th = document.createElement('th');
        th.className = 'px-3 py-3 text-left text-sm font-semibold border-r border-blue-500';
        
        // Create bilingual header
        const englishLabel = FIELD_LABELS[key];
        const hindiLabel = FIELD_LABELS_HINDI[key];
        th.innerHTML = `${englishLabel}<br/><span class="text-xs font-normal">${hindiLabel}</span>`;
        
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    records.forEach((record, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

        keys.forEach(key => {
            const td = document.createElement('td');
            td.className = 'px-3 py-3 text-sm text-gray-900 border-r border-b border-gray-200 whitespace-nowrap';
            td.textContent = record[key] || 'N/A';
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
    modalContent.appendChild(tableContainer);
}

/**
 * Display error message in modal
 * @param {string} message - Error message to display
 */
function displayError(message) {
    hideLoading();
    modalContent.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-700 font-semibold">Error / त्रुटि</p>
            <p class="text-red-600">${message}</p>
        </div>
    `;
}

/**
 * Show modal
 */
function showModal() {
    modal.classList.add('show');
}

/**
 * Hide modal
 */
function hideModal() {
    modal.classList.remove('show');
    modalContent.innerHTML = '';
}

/**
 * Show loading spinner
 */
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    modalContent.innerHTML = '';
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

// Modal event listeners
closeModalBtn.addEventListener('click', hideModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});