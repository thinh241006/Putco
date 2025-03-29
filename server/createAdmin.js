const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require('dotenv').config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const adminUser = {
      userName: "admin",
      email: "qungx@admin.com",
      password: await bcrypt.hash("Admin@1301", 12),
      role: "admin"
    };

    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const newAdmin = new User(adminUser);
    await newAdmin.save();
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser(); 