const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    console.log("Getting filtered products with query:", req.query);
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    console.log("Applying filters:", filters);
    console.log("Applying sort:", sort);

    const products = await Product.find(filters).sort(sort);
    console.log(`Found ${products.length} products`);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error getting filtered products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Getting product details for ID:", id);

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error getting product details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product details",
      error: error.message
    });
  }
};

module.exports = {
  getFilteredProducts,
  getProductDetails,
};
