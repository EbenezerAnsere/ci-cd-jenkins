const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    it('should return success message', async () => {
        const res = await request(app);

        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('CI/CD Pipeline Working Successfully!');
    });
});