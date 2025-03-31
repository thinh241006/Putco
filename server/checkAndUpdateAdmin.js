const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require('dotenv').config();

async function checkAndUpdateAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check for existing admin user
    const existingAdmin = await User.findOne({ email: "qungx@admin.com" });
    
    if (existingAdmin) {
      console.log("Found existing admin user:", existingAdmin);
      
      // If role is not admin, update it
      if (existingAdmin.role !== "admin") {
        console.log("Updating role to admin...");
        existingAdmin.role = "admin";
        await existingAdmin.save();
        console.log("Admin role updated successfully");
      } else {
        console.log("User already has admin role");
      }
    } else {
      // Create new admin user
      console.log("Creating new admin user...");
      const adminUser = {
        userName: "admin",
        email: "qungx@admin.com",
        password: await bcrypt.hash("Admin@1301", 12),
        role: "admin"
      };

      const newAdmin = new User(adminUser);
      await newAdmin.save();
      console.log("New admin user created successfully");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkAndUpdateAdmin(); 