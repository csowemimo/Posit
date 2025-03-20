import test, { expect } from "@playwright/test";

const url = 'https://swapi.dev/api/planets';

test.describe('Planets API Tests', () => {
    test('GET planets - success', async ({ request }) => {
        const response = await request.get(url);
        expect(response.status()).toBe(200);
    
        const responseBody = await response.json();
        expect(responseBody?.count).toBeGreaterThan(0);
        expect(responseBody?.next).toContain('page=2');
        expect(responseBody?.previous).toBeNull();
        expect(responseBody?.results).not.toBeNull();
  })
  
  test('GET specific planet - success', async ({ request }) => {
      const planetIdUrl = `${url}/1`;
      const response = await request.get(planetIdUrl);
      expect(response.status()).toBe(200);
  
      const responseBody = await response.json();
      expect(responseBody?.name).toBe('Tatooine');
      expect(responseBody?.url).toContain(planetIdUrl);
  })
  
  test('GET planets on specific page - success', async ({ request }) => {
      const response = await request.get(`${url}?page=3`);
      expect(response.status()).toBe(200);
  
      const responseBody = await response.json();
      expect(responseBody?.count).toBeGreaterThan(0);
      expect(responseBody?.next).toContain('page=4');
      expect(responseBody?.previous).toContain('page=2');
      expect(responseBody?.results[0]?.name).toBe('Eriadu');
  })
  
  test('GET specific planet - 404', async ({ request }) => {
      const response = await request.get(`${url}/999`);
  
      expect(response.status()).toBe(404);
  })
  
  test('GET planets on specific page - 404', async ({ request }) => {
      const response = await request.get(`${url}?page=999`);
  
      expect(response.status()).toBe(404);
  })
})
