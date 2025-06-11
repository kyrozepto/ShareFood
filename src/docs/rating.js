/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         rating_id:
 *           type: integer
 *         donation_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         rate:
 *           type: number
 *           format: float
 *           minimum: 1
 *           maximum: 5
 *         review:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     RatingInput:
 *       type: object
 *       required:
 *         - donation_id
 *         - rate
 *       properties:
 *         donation_id:
 *           type: string
 *         rate:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         review:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Submit and retrieve donation ratings
 */

/**
 * @swagger
 * /rating:
 *   get:
 *     summary: Get all ratings
 *     tags: [Ratings]
 *     responses:
 *       200:
 *         description: List of all ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 */

/**
 * @swagger
 * /rating/{id}:
 *   get:
 *     summary: Get a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the rating
 *     responses:
 *       200:
 *         description: Rating details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Rating not found
 */

/**
 * @swagger
 * /rating:
 *   post:
 *     summary: Submit a new rating for a completed donation
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/RatingInput'
 *     responses:
 *       201:
 *         description: Rating created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       400:
 *         description: Validation error or donation not completed
 *       500:
 *         description: Server error
 */
