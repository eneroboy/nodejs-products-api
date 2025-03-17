/**
 * @swagger
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       properties:
 *         allowedCategories:
 *           type: array
 *           items:
 *             type: string
 *           example: ["electronics", "books", "clothing"]
 *         forbiddenPhrases:
 *           type: array
 *           items:
 *             type: string
 *           example: ["test", "demo", "blocked"]
 *         priceLimits:
 *           type: object
 *           properties:
 *             electronics:
 *               type: object
 *               properties:
 *                 min:
 *                   type: number
 *                 max:
 *                   type: number
 *               example: { "min": 50, "max": 50000 }
 *             books:
 *               type: object
 *               properties:
 *                 min:
 *                   type: number
 *                 max:
 *                   type: number
 *               example: { "min": 5, "max": 500 }
 *             clothing:
 *               type: object
 *               properties:
 *                 min:
 *                   type: number
 *                 max:
 *                   type: number
 *               example: { "min": 10, "max": 5000 }
 */

/**
 * @swagger
 * settings:
 *   post:
 *     summary: Dodanie ustawień
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Settings'
 *     responses:
 *       201:
 *         description: Ustawienia zostały dodane
 */

/**
 * @swagger
 * settings:
 *   put:
 *     summary: Aktualizacja ustawień
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Settings'
 *     responses:
 *       200:
 *         description: Ustawienia zostały zaktualizowane
 */

/**
 * @swagger
 * settings:
 *   delete:
 *     summary: Usunięcie ustawień
 *     responses:
 *       204:
 *         description: Ustawienia zostały usunięte
 */
const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.post('/', settingsController.addSettings);
router.put('/', settingsController.updateSettings);
router.delete('/', settingsController.deleteSettings);

module.exports = router;