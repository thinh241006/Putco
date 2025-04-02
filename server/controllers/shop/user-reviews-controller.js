const UserReview = require("../../models/user-review");

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { placeId, rating, text } = req.body;
    const userId = req.user.id;
    const userName = req.user.userName;

    console.log("Received review data:", {
      placeId,
      rating,
      text,
      userId,
      userName,
    });

    if (!placeId) {
      return res.status(400).json({
        success: false,
        message: "Place ID is required",
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Review text is required",
      });
    }

    const review = new UserReview({
      placeId,
      userId,
      rating,
      text: text.trim(),
      userName,
    });

    await review.save();

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

// Get reviews for a place
exports.getPlaceReviews = async (req, res) => {
  try {
    const { placeId } = req.params;

    const reviews = await UserReview.find({ placeId })
      .sort({ createdAt: -1 })
      .lean(); // Convert to plain JavaScript objects

    // Ensure userId is properly formatted
    const formattedReviews = reviews.map(review => ({
      ...review,
      userId: review.userId.toString(), // Convert ObjectId to string
    }));

    console.log("Fetched reviews:", formattedReviews);

    res.status(200).json({
      success: true,
      data: formattedReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await UserReview.findOne({ _id: reviewId, userId });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or unauthorized",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, text } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Review text is required",
      });
    }

    const review = await UserReview.findOne({ _id: reviewId, userId });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or unauthorized",
      });
    }

    review.rating = rating;
    review.text = text.trim();
    await review.save();

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: error.message,
    });
  }
}; 