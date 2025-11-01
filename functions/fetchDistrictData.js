export async function onRequest(context) {
  const { env, request } = context;
  const API_KEY = env.API_KEY;
  const DB = env.DB;

  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const district = url.searchParams.get("district");
  const finYear = url.searchParams.get("finYear");

  if (!state || !district || !finYear) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Step 1: Check if data exists in database
    const cachedData = await DB.prepare(
      "SELECT * FROM district_performance WHERE state_name = ? AND district_name = ? AND fin_year = ?"
    )
      .bind(state, district, finYear)
      .all();

    if (cachedData.results && cachedData.results.length > 0) {
      console.log("Returning cached data from database");
      
      // Map database column names back to API format
      const mappedRecords = cachedData.results.map(row => ({
        fin_year: row.fin_year,
        month: row.month,
        state_code: row.state_code,
        state_name: row.state_name,
        district_code: row.district_code,
        district_name: row.district_name,
        Approved_Labour_Budget: row.approved_labour_budget,
        Average_Wage_rate_per_day_per_person: row.avg_wage_rate_per_day_per_person,
        Average_days_of_employment_provided_per_Household: row.avg_days_of_employment_provided_per_household,
        Differently_abled_persons_worked: row.differently_abled_persons_worked,
        Material_and_skilled_Wages: row.material_and_skilled_wages,
        Number_of_Completed_Works: row.number_of_completed_works,
        Total_No_of_JobCards_issued: row.total_no_of_jobcards_issued,
        Total_No_of_Workers: row.total_no_of_workers,
        Wages: row.wages,
        Women_Persondays: row.women_persondays,
        percent_of_Expenditure_on_Agriculture_Allied_Works: row.percent_of_expenditure_on_agriculture_allied_works,
        percent_of_NRM_Expenditure: row.percent_of_nrm_expenditure,
        percentage_payments_gererated_within_15_days: row.percentage_payments_gererated_within_15_days,
        Remarks: row.remarks
      }));
      
      return new Response(
        JSON.stringify({
          records: mappedRecords,
          source: "database",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
          },
        }
      );
    }

    // Step 2: Data not in database, fetch from API
    console.log("Fetching fresh data from API");
    const API_BASE_URL =
      "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
    const apiURL = `${API_BASE_URL}?api-key=${API_KEY}&format=json&filters[state_name]=${encodeURIComponent(
      state
    )}&filters[fin_year]=${encodeURIComponent(
      finYear
    )}&filters[district_name]=${encodeURIComponent(district)}`;

    const response = await fetch(apiURL);
    const data = await response.json();

    // Step 3: Store data in database
    if (data.records && data.records.length > 0) {
      for (const record of data.records) {
        await DB.prepare(
          `
          INSERT OR REPLACE INTO district_performance (
            fin_year, month, state_code, state_name, district_code, district_name,
            approved_labour_budget, avg_wage_rate_per_day_per_person,
            avg_days_of_employment_provided_per_household, differently_abled_persons_worked,
            material_and_skilled_wages, number_of_completed_works,
            total_no_of_jobcards_issued, total_no_of_workers, wages, women_persondays,
            percent_of_expenditure_on_agriculture_allied_works, percent_of_nrm_expenditure,
            percentage_payments_gererated_within_15_days, remarks
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        )
          .bind(
            record.fin_year,
            record.month,
            record.state_code,
            record.state_name,
            record.district_code,
            record.district_name,
            record.Approved_Labour_Budget,
            record.Average_Wage_rate_per_day_per_person,
            record.Average_days_of_employment_provided_per_Household,
            record.Differently_abled_persons_worked,
            record.Material_and_skilled_Wages,
            record.Number_of_Completed_Works,
            record.Total_No_of_JobCards_issued,
            record.Total_No_of_Workers,
            record.Wages,
            record.Women_Persondays,
            record.percent_of_Expenditure_on_Agriculture_Allied_Works,
            record.percent_of_NRM_Expenditure,
            record.percentage_payments_gererated_within_15_days,
            record.Remarks
          )
          .run();
      }
    }

    return new Response(
      JSON.stringify({
        ...data,
        source: "api",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}