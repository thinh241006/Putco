const express = require("express");
const { addReview, getPlaceReviews, deleteReview, updateReview } = require("../../controllers/shop/user-reviews-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

// Public routes
router.get("/:placeId", getPlaceReviews);

// Protected routes
router.post("/", authMiddleware, addReview);
router.delete("/:reviewId", authMiddleware, deleteReview);
router.put("/:reviewId", authMiddleware, updateReview);

module.exports = router; 