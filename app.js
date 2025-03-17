require('dotenv').config();
const express = require('express');
const app = express();
const dbConnect = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dbConnect();

app.use(express.json());

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API do zarządzania produktami'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api/v1/`
      }
    ]
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const productRoutes = require('./src/routes/productRoutes');
app.use('/api/v1/products', productRoutes);

const settingsRoutes = require('./src/routes/settingsRoutes');
app.use('/api/v1/settings', settingsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
}

module.exports = app;
