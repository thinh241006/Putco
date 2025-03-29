const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Product image is required"]
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      validate: {
        validator: function(v) {
          // Basic profanity check - you should use a proper profanity filter library in production
          const inappropriateWords = ['hitler', 'nazi', 'hate'];
          return !inappropriateWords.some(word => 
            v.toLowerCase().includes(word)
          );
        },
        message: "Product title contains inappropriate content"
      }
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      validate: {
        validator: function(v) {
          const inappropriateWords = ['hitler', 'nazi', 'hate'];
          return !inappropriateWords.some(word => 
            v.toLowerCase().includes(word)
          );
        },
        message: "Product description contains inappropriate content"
      }
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ['men', 'women', 'kids', 'accessories'],
        message: "Invalid category selected"
      }
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"]
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
    },
    salePrice: {
      type: Number,
      min: [0, "Sale price cannot be negative"],
      validate: {
        validator: function(v) {
          return v <= this.price;
        },
        message: "Sale price cannot be greater than regular price"
      }
    },
    totalStock: {
      type: Number,
      required: [true, "Total stock is required"],
      min: [0, "Stock cannot be negative"]
    },
    averageReview: {
      type: Number,
      default: 0,
      min: [0, "Average review cannot be negative"],
      max: [5, "Average review cannot exceed 5"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
