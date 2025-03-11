// process.env.NODE_ENV = 'test';
// process.env.MONGODB_URI = 'mongodb://localhost:27017/productsdb_test';

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const Product = require('../src/models/Product');

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

  it('should create a product', async () => {
    const productData = {
      name: "Headphones",
      category: "electronics",
      price: 1000,
      quantity: 5
    };

    const res = await request(app)
      .post('/api/v1/products')
      .send(productData);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal(productData.name);
  });

  it('should not create product with forbidden phrase', async () => {
    const productData = {
      name: "DemoProduct",
      category: "books",
      price: 20,
      quantity: 10
    };

    const res = await request(app)
      .post('/api/v1/products')
      .send(productData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('should get all products', async () => {
    await Product.create({
      name: "Product1",
      category: "books",
      price: 30,
      quantity: 3
    });
    const res = await request(app).get('/api/v1/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
  });

});
