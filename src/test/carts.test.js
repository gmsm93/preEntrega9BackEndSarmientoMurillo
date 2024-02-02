import { expect } from 'chai';
import { request } from './helpers';

describe('Carts Router', () => {
    it('should get a cart by ID', async () => {
        const response = await request.get('/cart/1234');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

    it('should create a new cart', async () => {
        const newCart = {
            title: 'Nuevo Carrito',
        };

        const response = await request.post('/cart').send(newCart);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal('Nuevo Carrito');
    });

    it('should update a cart by ID', async () => {
        const updatedCart = {
            title: 'Carrito Actualizado',
        };

        const response = await request.put('/cart/1234').send(updatedCart);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal('Carrito Actualizado');
    });

    it('should delete a cart by ID', async () => {
        const response = await request.delete('/cart/1234');
        expect(response.status).to.equal(200);
    });

});
