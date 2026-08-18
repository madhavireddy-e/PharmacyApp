const API_URL = 'http://localhost:5053/api/medicines';

export async function getMedicines() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to load medicines.');
  }

  return response.json();
}

export async function addMedicine(medicine) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicine),
  });

  if (!response.ok) {
    throw new Error('Failed to save the medicine.');
  }

  return response.json();
}
