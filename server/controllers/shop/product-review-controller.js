const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    console.log("Adding review for product:", productId, "by user:", userId);

    // Check if user has purchased the product
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: { $in: ["confirmed", "delivered", "completed", "shipped"] }
    });

    if (!order) {
      console.log("User has not purchased the product");
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    // Check for existing review
    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      console.log("User has already reviewed this product");
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    // Create new review
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();
    console.log("New review saved successfully");

    // Update product's average rating
    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });
    console.log("Product average rating updated:", averageReview);

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.error("Error adding product review:", error);
    res.status(500).json({
      success: false,
      message: "Error adding review",
      error: error.message
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Fetching reviews for product:", productId);

    const reviews = await ProductReview.find({ productId })
      .sort({ createdAt: -1 }); // Sort by newest first

    console.log(`Found ${reviews.length} reviews for product ${productId}`);
    
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message
    });
  }
};

module.exports = { addProductReview, getProductReviews };
