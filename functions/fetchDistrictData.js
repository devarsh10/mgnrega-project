export async function onRequest(context) {
  const API_KEY = context.env.API_KEY;

  const url = new URL(context.request.url);
  const state = url.searchParams.get("state");
  const district = url.searchParams.get("district");
  const finYear = url.searchParams.get("finYear");

  const API_BASE_URL = "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";

  const apiURL = `${API_BASE_URL}?api-key=${API_KEY}&format=json&filters[state_name]=${encodeURIComponent(state)}&filters[fin_year]=${encodeURIComponent(finYear)}&filters[district_name]=${encodeURIComponent(district)}`;

  const response = await fetch(apiURL);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
