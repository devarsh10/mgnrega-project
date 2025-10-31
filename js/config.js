// API Configuration
const CONFIG = {
    API_BASE_URL: 'http://localhost:3000/api/district-performance'
};

// Field Labels (English)
const FIELD_LABELS = {
    'fin_year': 'Financial Year',
    'month': 'Month',
    'state_code': 'State Code',
    'state_name': 'State Name',
    'district_code': 'District Code',
    'district_name': 'District Name',
    'Approved_Labour_Budget': 'Approved Labour Budget',
    'Average_Wage_rate_per_day_per_person': 'Average Wage Rate Per Day Per Person',
    'Average_days_of_employment_provided_per_Household': 'Average Days Of Employment Provided Per Household',
    'Differently_abled_persons_worked': 'Differently Abled Persons Worked',
    'Material_and_skilled_Wages': 'Material And Skilled Wages',
    'Number_of_Completed_Works': 'Number Of Completed Works',
    'Total_No_of_JobCards_issued': 'Total No Of Job Cards Issued',
    'Total_No_of_Workers': 'Total No Of Workers',
    'Wages': 'Wages',
    'Women_Persondays': 'Women Persondays',
    'percent_of_Expenditure_on_Agriculture_Allied_Works': 'Percent Of Expenditure On Agriculture Allied Works',
    'percent_of_NRM_Expenditure': 'Percent Of NRM Expenditure',
    'percentage_payments_gererated_within_15_days': 'Percentage Payments Generated Within 15 Days',
    'Remarks': 'Remarks'
};

// Field Labels (Hindi)
const FIELD_LABELS_HINDI = {
    'fin_year': 'वित्तीय वर्ष',
    'month': 'महीना',
    'state_code': 'राज्य कोड',
    'state_name': 'राज्य का नाम',
    'district_code': 'जिला कोड',
    'district_name': 'जिला का नाम',
    'Approved_Labour_Budget': 'स्वीकृत श्रम बजट',
    'Average_Wage_rate_per_day_per_person': 'प्रति व्यक्ति प्रति दिन औसत मजदूरी दर',
    'Average_days_of_employment_provided_per_Household': 'प्रति परिवार रोजगार के औसत दिन',
    'Differently_abled_persons_worked': 'दिव्यांग व्यक्तियों ने काम किया',
    'Material_and_skilled_Wages': 'सामग्री और कुशल मजदूरी',
    'Number_of_Completed_Works': 'पूर्ण किए गए कार्यों की संख्या',
    'Total_No_of_JobCards_issued': 'जारी किए गए जॉब कार्ड की कुल संख्या',
    'Total_No_of_Workers': 'कुल श्रमिकों की संख्या',
    'Wages': 'मजदूरी',
    'Women_Persondays': 'महिला व्यक्ति-दिवस',
    'percent_of_Expenditure_on_Agriculture_Allied_Works': 'कृषि संबद्ध कार्यों पर व्यय का प्रतिशत',
    'percent_of_NRM_Expenditure': 'एनआरएम व्यय का प्रतिशत',
    'percentage_payments_gererated_within_15_days': '15 दिनों के भीतर भुगतान का प्रतिशत',
    'Remarks': 'टिप्पणी'
};

// Maharashtra Districts
const MAHARASHTRA_DISTRICTS = [
    { value: 'AHMEDNAGAR', label: 'Ahmednagar / अहमदनगर' },
    { value: 'AKOLA', label: 'Akola / अकोला' },
    { value: 'AMRAVATI', label: 'Amravati / अमरावती' },
    { value: 'AURANGABAD', label: 'Aurangabad / औरंगाबाद' },
    { value: 'BEED', label: 'Beed / बीड' },
    { value: 'BHANDARA', label: 'Bhandara / भंडारा' },
    { value: 'BULDHANA', label: 'Buldhana / बुलढाणा' },
    { value: 'CHANDRAPUR', label: 'Chandrapur / चंद्रपूर' },
    { value: 'DHULE', label: 'Dhule / धुळे' },
    { value: 'GADCHIROLI', label: 'Gadchiroli / गडचिरोली' },
    { value: 'GONDIA', label: 'Gondia / गोंदिया' },
    { value: 'HINGOLI', label: 'Hingoli / हिंगोली' },
    { value: 'JALGAON', label: 'Jalgaon / जळगाव' },
    { value: 'JALNA', label: 'Jalna / जालना' },
    { value: 'KOLHAPUR', label: 'Kolhapur / कोल्हापूर' },
    { value: 'LATUR', label: 'Latur / लातूर' },
    { value: 'MUMBAI', label: 'Mumbai / मुंबई' },
    { value: 'MUMBAI SUBURBAN', label: 'Mumbai Suburban / मुंबई उपनगर' },
    { value: 'NAGPUR', label: 'Nagpur / नागपूर' },
    { value: 'NANDED', label: 'Nanded / नांदेड' },
    { value: 'NANDURBAR', label: 'Nandurbar / नंदुरबार' },
    { value: 'NASHIK', label: 'Nashik / नाशिक' },
    { value: 'OSMANABAD', label: 'Osmanabad / उस्मानाबाद' },
    { value: 'PALGHAR', label: 'Palghar / पालघर' },
    { value: 'PARBHANI', label: 'Parbhani / परभणी' },
    { value: 'PUNE', label: 'Pune / पुणे' },
    { value: 'RAIGAD', label: 'Raigad / रायगड' },
    { value: 'RATNAGIRI', label: 'Ratnagiri / रत्नागिरी' },
    { value: 'SANGLI', label: 'Sangli / सांगली' },
    { value: 'SATARA', label: 'Satara / सातारा' },
    { value: 'SINDHUDURG', label: 'Sindhudurg / सिंधुदुर्ग' },
    { value: 'SOLAPUR', label: 'Solapur / सोलापूर' },
    { value: 'THANE', label: 'Thane / ठाणे' },
    { value: 'WARDHA', label: 'Wardha / वर्धा' },
    { value: 'WASHIM', label: 'Washim / वाशिम' },
    { value: 'YAVATMAL', label: 'Yavatmal / यवतमाळ' }
];