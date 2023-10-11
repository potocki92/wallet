const express = require("express");
const { auth } = require("../middleware/auth");
const {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getStatsTransactions,
  getCurrentMonthTransactions,
} = require("../controllers/transactions.controller");

const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get transactions
 *     description: Get transactions
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Unauthorized
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Not authorized
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.get("/", auth, getCurrentMonthTransactions);
/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     description: Retrieve a transaction by its ID.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the transaction to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: 1234567890abcdef12345678
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Blue
 *                         color:
 *                           type: string
 *                           example: "#FFFFFF"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Unauthorized
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Not authorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Transaction not found
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.get("/:id", auth, getTransaction);
/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Create a new transaction
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: body
 *         name: transactions
 *         description: Transaction to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: date
 *               example: 2023-10-09T09:55:34.412Z
 *             income:
 *               type: boolean
 *               example: true
 *             categories:
 *               type: string
 *               example: "car"
 *             comment:
 *               type: string
 *               example: "Car when was sold"
 *             sum:
 *               type: number
 *               example: 20000
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Created
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Blue
 *                         color:
 *                           type: string
 *                           example: "#FFFFFF"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: missing required name - field
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Unauthorized
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Not authorized
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.post("/", auth, createTransaction);
/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     description: Update a transaction by its ID.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the transaction to update.
 *         required: true
 *         schema:
 *           type: string
 *           example: 1234567890abcdef12345678
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       - in: body
 *         name: transaction
 *         description: Updated transaction data.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: date
 *               example: 2023-10-09T09:55:34.412Z
 *             category:
 *               type: string
 *               example: "car"
 *             comment:
 *               type: string
 *               example: "Car when was sold"
 *             sum:
 *               type: number
 *               example: 20000
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     transaction:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Blue
 *                         color:
 *                           type: string
 *                           example: "#FFFFFF"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: missing fields
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Unauthorized
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Not authorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Transaction not found
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.put("/:id", auth, updateTransaction);
/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     description: Delete a transaction by its ID.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the transaction to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: 1234567890abcdef12345678
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Transaction deleted successfully
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Transaction not found
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Server error
 */

router.delete("/:id", auth, deleteTransaction);
/**
 * @swagger
 * /api/transactions/stats/{year}/{month}:
 *   get:
 *     summary: Get statistics for transactions in a specific year and month
 *     description: Retrieve statistics for transactions that match the specified year and month.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: year
 *         description: The year for which you want to retrieve statistics (e.g., 2023).
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2023
 *       - in: path
 *         name: month
 *         description: The month for which you want to retrieve statistics (e.g., 10 for October).
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     statistics:
 *                       type: object
 *                       description: The statistics for the specified year and month.
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: List of categories associated with the user.
 *                       description: List of categories associated with the user.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Unauthorized
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Not authorized
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.get("/stats/:year/:month", auth, getStatsTransactions);
router.get("/stats/balance");
module.exports = router;
