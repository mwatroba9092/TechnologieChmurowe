const request = require('supertest');
const app = require('./server');

describe('Testy endpointów API', () => {
  it('Powinno zwrócić status OK dla endpointu /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('uptime');
  });

  it('Powinno zwrócić statystyki dla endpointu /stats', async () => {
    const res = await request(app).get('/stats');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('count');
    expect(res.body).toHaveProperty('requestCount');
  });
});