import { expect } from 'chai';
import { request } from './helpers'; 

describe('Products Router', () => {
    it('should get all products', async () => {
        const response = await request.get('/product');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('should get a product by ID', async () => {
        const response = await request.get('/product/abc123');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.equal('abc123');
    });

    it('should create a new product', async () => {
        const newProduct = {
            title: 'Nuevo Producto',
            description: 'Descripción del nuevo producto',
        };

        const response = await request.post('/product').send(newProduct);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal('Nuevo Producto');
    });

    it('should update a product by ID', async () => {
        const updatedProduct = {
            title: 'Producto Actualizado',
        };

        const response = await request.put('/product/xyz789').send(updatedProduct);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.title).to.equal('Producto Actualizado');
    });

    it('should delete a product by ID', async () => {
        const response = await request.delete('/product/delete123');
        expect(response.status).to.equal(200);
    });

});
