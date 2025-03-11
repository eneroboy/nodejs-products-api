const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           description: Nazwa produktu (unikalna, 3-20 znaków, alfanumeryczna)
 *         category:
 *           type: string
 *           description: Kategoria produktu (electronics, books, clothing)
 *         price:
 *           type: number
 *           description: Cena produktu
 *         quantity:
 *           type: number
 *           description: Ilość dostępnych produktów (liczba całkowita >= 0)
 *       example:
 *         name: "Laptop123"
 *         category: "electronics"
 *         price: 1500
 *         quantity: 10
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Pobranie listy produktów
 *     responses:
 *       200:
 *         description: Lista produktów
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Pobranie szczegółów jednego produktu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID produktu
 *     responses:
 *       200:
 *         description: Szczegóły produktu
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Dodanie nowego produktu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produkt został utworzony
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Aktualizacja istniejącego produktu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID produktu do aktualizacji
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produkt został zaktualizowany
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Usunięcie produktu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID produktu do usunięcia
 *     responses:
 *       204:
 *         description: Produkt został usunięty
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
