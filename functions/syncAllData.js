export async function onRequest(context) {
  const { env, request } = context;
  const API_KEY = env.API_KEY;
  const DB = env.DB;

  const url = new URL(request.url);
  const batchNumber = parseInt(url.searchParams.get("batch") || "1");
  const batchSize = 40; // Process 40 at a time to stay under 50 limit

  const districts = [
    'AHMEDNAGAR', 'AKOLA', 'AMRAVATI', 'AURANGABAD', 'BEED', 'BHANDARA',
    'BULDHANA', 'CHANDRAPUR', 'DHULE', 'GADCHIROLI', 'GONDIA', 'HINGOLI',
    'JALGAON', 'JALNA', 'KOLHAPUR', 'LATUR', 'MUMBAI', 'MUMBAI SUBURBAN',
    'NAGPUR', 'NANDED', 'NANDURBAR', 'NASHIK', 'OSMANABAD', 'PALGHAR',
    'PARBHANI', 'PUNE', 'RAIGAD', 'RATNAGIRI', 'SANGLI', 'SATARA',
    'SINDHUDURG', 'SOLAPUR', 'THANE', 'WARDHA', 'WASHIM', 'YAVATMAL'
  ];

  const finYears = ['2024-2025', '2023-2024', '2022-2023'];
  const state = 'MAHARASHTRA';

  // Create all combinations
  const allCombinations = [];
  for (const finYear of finYears) {
    for (const district of districts) {
      allCombinations.push({ district, finYear });
    }
  }

  // Get batch subset
  const startIndex = (batchNumber - 1) * batchSize;
  const batch = allCombinations.slice(startIndex, startIndex + batchSize);

  let syncedCount = 0;
  let errors = [];

  for (const { district, finYear } of batch) {
    try {
      const API_BASE_URL = "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
      const apiURL = `${API_BASE_URL}?api-key=${API_KEY}&format=json&filters[state_name]=${encodeURIComponent(state)}&filters[fin_year]=${encodeURIComponent(finYear)}&filters[district_name]=${encodeURIComponent(district)}`;

      const response = await fetch(apiURL);
      const data = await response.json();

      if (data.records && data.records.length > 0) {
        for (const record of data.records) {
          await DB.prepare(`
            INSERT OR REPLACE INTO district_performance (
              fin_year, month, state_code, state_name, district_code, district_name,
              approved_labour_budget, avg_wage_rate_per_day_per_person,
              avg_days_of_employment_provided_per_household, differently_abled_persons_worked,
              material_and_skilled_wages, number_of_completed_works,
              total_no_of_jobcards_issued, total_no_of_workers, wages, women_persondays,
              percent_of_expenditure_on_agriculture_allied_works, percent_of_nrm_expenditure,
              percentage_payments_gererated_within_15_days, remarks
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            record.fin_year, record.month, record.state_code, record.state_name,
            record.district_code, record.district_name, record.Approved_Labour_Budget,
            record.Average_Wage_rate_per_day_per_person,
            record.Average_days_of_employment_provided_per_Household,
            record.Differently_abled_persons_worked, record.Material_and_skilled_Wages,
            record.Number_of_Completed_Works, record.Total_No_of_JobCards_issued,
            record.Total_No_of_Workers, record.Wages, record.Women_Persondays,
            record.percent_of_Expenditure_on_Agriculture_Allied_Works,
            record.percent_of_NRM_Expenditure,
            record.percentage_payments_gererated_within_15_days, record.Remarks
          ).run();
        }
        syncedCount++;
      }

      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      errors.push({ district, finYear, error: error.message });
    }
  }

  const totalBatches = Math.ceil(allCombinations.length / batchSize);

  return new Response(JSON.stringify({
    success: true,
    batch: batchNumber,
    totalBatches,
    syncedCount,
    batchSize: batch.length,
    errors: errors.length > 0 ? errors : undefined,
    message: `Batch ${batchNumber}/${totalBatches} complete. Synced ${syncedCount} combinations.`,
    nextBatch: batchNumber < totalBatches ? `?batch=${batchNumber + 1}` : null
  }), {
    headers: { "Content-Type": "application/json" }
  });
}