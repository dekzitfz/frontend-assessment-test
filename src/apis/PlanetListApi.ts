import {BASE_URL} from '.';

export async function fetchPlanets(currentPage = 1) {
  try {
    const response = await fetch(`${BASE_URL}/planets?page=${currentPage}`);
    return response.json();
  } catch (error) {
    console.log('erroor', error);
  }
}
