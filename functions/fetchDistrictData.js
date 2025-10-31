export async function onRequest(context) {
  const API_KEY = context.env.API_KEY;
  const url = new URL(context.request.url);
  
  const state = url.searchParams.get("state");
  const district = url.searchParams.get("district");
  const finYear = url.searchParams.get("finYear");

  const apiURL = `${CONFIG.API_BASE_URL}?api-key=${API_KEY}&format=json&filters[state_name]=${encodeURIComponent(state)}&filters[fin_year]=${encodeURIComponent(finYear)}&filters[district_name]=${encodeURIComponent(district)}`;

  const res = await fetch(apiURL);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
