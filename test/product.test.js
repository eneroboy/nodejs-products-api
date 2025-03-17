const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const Product = require('../src/models/Product');
const ProductHistory = require('../src/models/ProductHistory');

describe('Product API', () => {
  before((done) => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => done())
      .catch(done);
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  after((done) => {
    mongoose.connection.close(() => done());
  });
    
  it('should create a new product', async () => {
    const productData = {
      name: "Speaker",
      category: "electronics",
      price: 120,
      quantity: 10
    };

    const res = await request(app)
      .post('/api/v1/products')
      .send(productData);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal(productData.name);
  });

  it('should not create product with invalid price for the category', async () => {
    const productData = {
      name: "CheapGadget",
      category: "electronics",
      price: 30,
      quantity: 5
    };

    const res = await request(app)
      .post('/api/v1/products')
      .send(productData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should not create product with nonexisting category', async () => {
    const productData = {
      name: "MysteryItem",
      category: "toys",
      price: 100,
      quantity: 2
    };

    const res = await request(app)
      .post('/api/v1/products')
      .send(productData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should update a product and record change history', async () => {
    const productData = {
      name: "UpdatableProduct",
      category: "books",
      price: 15,
      quantity: 4
    };

    const createRes = await request(app)
      .post('/api/v1/products')
      .send(productData);
    expect(createRes.status).to.equal(201);
    const productId = createRes.body._id;

    const updateData = { price: 18 };
    const updateRes = await request(app)
      .put(`/api/v1/products/${productId}`)
      .send(updateData);
    expect(updateRes.status).to.equal(200);
    expect(updateRes.body.price).to.equal(18);

    const getRes = await request(app)
      .get(`/api/v1/products/${productId}`);
    expect(getRes.status).to.equal(200);
    expect(getRes.body).to.have.property('history');
    expect(getRes.body.history).to.be.an('array').that.is.not.empty;
    const updateHistory = getRes.body.history.find(record => record.change === 'update');
    expect(updateHistory).to.exist;
  });

  it('should return list of products', async () => {
    await Product.create({
      name: "ListProduct",
      category: "books",
      price: 40,
      quantity: 6
    });

    const res = await request(app)
      .get('/api/v1/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.at.least(1);
  });

  it('should delete a product', async () => {
    const productData = {
      name: "DeleteMe",
      category: "clothing",
      price: 150,
      quantity: 3
    };

    const createRes = await request(app)
      .post('/api/v1/products')
      .send(productData);
    expect(createRes.status).to.equal(201);
    const productId = createRes.body._id;

    const deleteRes = await request(app)
      .delete(`/api/v1/products/${productId}`);
    expect(deleteRes.status).to.equal(204);

    const getRes = await request(app)
      .get(`/api/v1/products/${productId}`);
    expect(getRes.status).to.equal(404);
  });

  it('should block creation of product containing that phrase in name', async () => {
    const productData = {
      name: "adam",
      category: "books",
      price: 25,
      quantity: 7
    };

    const res = await request(app)
      .post('/api/v1/products')
      .send(productData);
      
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should block creation of product with duplicate name', async () => {
    const productData = {
      name: "UniqueProduct",
      category: "books",
      price: 50,
      quantity: 5
    };
  
    const firstRes = await request(app)
      .post('/api/v1/products')
      .send(productData);
    expect(firstRes.status).to.equal(201);
  
    const duplicateRes = await request(app)
      .post('/api/v1/products')
      .send(productData);
    expect(duplicateRes.status).to.equal(400);
    expect(duplicateRes.body).to.have.property('error');
    expect(duplicateRes.body.error).to.contain('Produkt o podanej nazwie już istnieje');
  });
});
