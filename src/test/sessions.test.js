const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Sessions Router', () => {
    it('Debe loguear a un usuario', async () => {
        const userCredentials = {
            email: 'adminCoder@coder.com',
            password: 'adminCod3r123',
        };
        const response = await request.post('/api/session/login').send(userCredentials);
        expect(response.status).toBe(200);
        expect(response.body).to.be.an('object');
        expect(response.body.message).toBe('Inicio de sesión exitoso');
    });

    it('Debe cerrar la sesion de un usuario', async () => {
        const response = await request.post('/api/session/logout');
        expect(response.status).toBe(200);
    });

});