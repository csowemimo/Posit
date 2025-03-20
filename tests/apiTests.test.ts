import test, { expect } from "@playwright/test";

const url = 'https://swapi.dev/api/planets';

test.describe('Planets API Tests', () => {
    // Verify that the API returns a valid response with a list of planets
    test('GET planets - success', async ({ request }) => {
        const response = await request.get(url);
        expect(response.status()).toBe(200);
    
        const responseBody = await response.json();
        expect(responseBody?.count).toBeGreaterThan(0);
        expect(responseBody?.next).toContain('page=2');
        expect(responseBody?.previous).toBeNull();
        expect(responseBody?.results).not.toBeNull();
  })
  
  // Verify that the API returns a valid response with a specific planet id
  test('GET specific planet - success', async ({ request }) => {
      const planetIdUrl = `${url}/1`;
      const response = await request.get(planetIdUrl);
      expect(response.status()).toBe(200);
  
      const responseBody = await response.json();
      expect(responseBody?.name).not.toBeNull();
      expect(responseBody?.url).toContain(planetIdUrl);
  })
  
  // Verify that the API returns a valid response with a list of planets from a specified page
  test('GET planets on specific page - success', async ({ request }) => {
      const response = await request.get(`${url}?page=3`);
      expect(response.status()).toBe(200);
  
      const responseBody = await response.json();
      expect(responseBody?.count).toBeGreaterThan(0);
      expect(responseBody?.next).toContain('page=4');
      expect(responseBody?.previous).toContain('page=2');
      expect(responseBody?.results[0]?.name).not.toBeNull();
  })
  
  // Verify that the API returns a 404 response for an invalid planet id
  test('GET specific planet - not found', async ({ request }) => {
      const response = await request.get(`${url}/999`);
  
      expect(response.status()).toBe(404);
  })
  
  // Verify that the API returns a 404 response for an invalid page
  test('GET planets on specific page - not found', async ({ request }) => {
      const response = await request.get(`${url}?page=999`);
  
      expect(response.status()).toBe(404);
  })
})
