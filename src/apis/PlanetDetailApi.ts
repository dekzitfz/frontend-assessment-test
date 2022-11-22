export async function fetchPlanetDetail(uri: string) {
  try {
    const response = await fetch(`${uri}`);
    return response.json();
  } catch (error) {
    console.log('erroor', error);
  }
}
