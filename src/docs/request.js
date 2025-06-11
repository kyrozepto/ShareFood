/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         request_id:
 *           type: integer
 *         donation_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         requested_quantity:
 *           type: string
 *           example: "2 pcs"
 *         pickup_time:
 *           type: string
 *           format: time
 *         note:
 *           type: string
 *         request_status:
 *           type: string
 *           enum: [waiting, approved, rejected, completed, canceled]
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     RequestInput:
 *       type: object
 *       required:
 *         - donation_id
 *         - requested_quantity
 *         - pickup_time
 *         - note
 *       properties:
 *         donation_id:
 *           type: integer
 *         requested_quantity:
 *           type: string
 *           example: "3 pcs"
 *         pickup_time:
 *           type: string
 *           format: time
 *         note:
 *           type: string
 *
 *     RequestUpdateInput:
 *       type: object
 *       required:
 *         - request_status
 *       properties:
 *         request_status:
 *           type: string
 *           enum: [waiting, approved, rejected, completed, canceled]
 */

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Manage donation requests
 */

/**
 * @swagger
 * /request:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: List of all donation requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 */

/**
 * @swagger
 * /request/{id}:
 *   get:
 *     summary: Get a request by ID
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the request
 *     responses:
 *       200:
 *         description: Request details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /request:
 *   post:
 *     summary: Create a new request for a donation
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/RequestInput'
 *     responses:
 *       201:
 *         description: Request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       400:
 *         description: Validation or lookup error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /request/{id}:
 *   put:
 *     summary: Update request status
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the request to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/RequestUpdateInput'
 *     responses:
 *       200:
 *         description: Request (and related donation) status updated
 *       400:
 *         description: Missing or invalid status
 *       404:
 *         description: Request or related donation not found
 *       500:
 *         description: Server error
 */
