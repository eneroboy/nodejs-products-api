# Node.js Products API

This project is a RESTful API built with Node.js for managing products. It supports CRUD operations (Create, Read, Update, Delete) and stores data in MongoDB. The API also tracks the history of changes for each product, enforces domain-specific validations, and provides interactive API documentation using Swagger. The application is designed following SOLID, DRY, and KISS principles with an N-Layer architecture.

## Features

- **Product CRUD Operations:**
  - Retrieve a list of products (with key details: ID, name, price)
  - Retrieve details of a single product by its ID
  - Create new products
  - Update existing products (with change history recording)
  - Delete products (with change history recording)
- **Domain-Specific Validation:**
  - Unique product name (3-20 characters, alphanumeric only)
  - Price validation based on product category (e.g., electronics, books, clothing)
  - Quantity must be an integer greater than or equal to 0
- **Product Change History:**
  - Record changes (create, update, delete) in a separate collection
- **Dynamic Forbidden Phrases:**
  - Block creation or updates of products if their name contains any forbidden phrases
- **API Documentation:**
  - Interactive API documentation available via Swagger
- **Integration Testing:**
  - Tests written using Mocha, Chai, and Supertest

## Technologies

- **Backend:** Node.js, Express
- **Database:** MongoDB (using Mongoose)
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Testing:** Mocha, Chai, Supertest
- **Configuration:** dotenv

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your_username/nodejs-products-api.git
   cd nodejs-products-api


2. **Install dependencies:**

   ```bash
   npm install
   

3. **Configure environment variables:**

   Create a `.env` file in the root directory and set the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/productsdb


## Running the Application

To start the application, run:

```bash
npm start

```

The API will be available at `http://localhost:3000/api/v1/products`.

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs`.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any improvements to the project.

## License

This project is open source and available under the [MIT License](LICENSE).
```

