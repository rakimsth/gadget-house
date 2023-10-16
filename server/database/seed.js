require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const categoryController = require("../modules/categories/category.controller");
const productController = require("../modules/products/product.controller");
const userController = require("../modules/users/user.controller");

mongoose.connect(process.env.DB_URL);
var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
    console.log("Creating Admin Account");
    const payload = {
      name: "Raktim Admin",
      email: "rakimsth@gmail.com",
      password: await bcrypt.hash("password", +process.env.SALT_ROUNDS),
      roles: ["admin"],
      isActive: true,
      isArchived: false,
      isEmailVerified: true,
    };
    await userController.create(payload);
    console.log("---------DONE----------");

    console.log("Creating User Account");
    const userPayload = {
      name: "Raktim User",
      email: "raktim@rumsan.com",
      password: await bcrypt.hash("password", +process.env.SALT_ROUNDS),
      isActive: true,
      isArchived: false,
      isEmailVerified: true,
    };
    await userController.create(userPayload);
    console.log("---------DONE----------");

    console.log("Creating Categories");
    const cat1 = await categoryController.create({ name: "Tshirt" });
    const cat2 = await categoryController.create({ name: "Jeans" });
    console.log("---------DONE----------");

    console.log("Creating Products");
    await productController.create({
      name: "Black One Tshirt",
      brand: "Zara",
      price: 1500,
      quantity: 10,
      description: "Best Tshirt in the market",
      sku: "t-001",
      category: cat1?._id,
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-teal-t-shirt-product-images-rvowvf0akl-0-202211051905.jpg?im=Resize=(500,630)",
        "https://thehouseofrare.com/cdn/shop/products/IMG_0053_5c650849-9d9d-4cc3-8863-6a23778cd9a0.jpg?v=1675170808",
      ],
    });
    await productController.create({
      name: "Blue Two Jeans",
      brand: "Zara",
      price: 2500,
      quantity: 5,
      description: "Best Jeans in the market",
      sku: "J-001",
      category: cat2?._id,
      images: [
        "https://cdn.pixelbin.io/v2/black-bread-289bfa/iix9pB/wrkr/t.resize(h:600,w:510)/data/gas/21072022/410316769_A222_1.jpg",
      ],
    });
    await productController.create({
      name: "High Skinny Tight Jeans",
      brand: "Tommys",
      price: 2500,
      quantity: 0,
      description: "Best Skinny Fit Jeans in the market",
      sku: "J-002",
      category: cat2?._id,
      images: [
        "https://thumbs.dreamstime.com/b/blue-jeans-isolated-white-34440719.jpg",
      ],
    });
    await productController.create({
      name: "Black Three Tshirt",
      brand: "Zara",
      price: 1500,
      quantity: 10,
      description: "Best Tshirt in the market",
      sku: "t-002",
      category: cat1?._id,
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-teal-t-shirt-product-images-rvowvf0akl-0-202211051905.jpg?im=Resize=(500,630)",
        "https://thehouseofrare.com/cdn/shop/products/IMG_0053_5c650849-9d9d-4cc3-8863-6a23778cd9a0.jpg?v=1675170808",
      ],
    });
    await productController.create({
      name: "Blue Three Jeans",
      brand: "Zara",
      price: 2500,
      quantity: 5,
      description: "Best Jeans in the market",
      sku: "J-003",
      category: cat2?._id,
      images: [
        "https://cdn.pixelbin.io/v2/black-bread-289bfa/iix9pB/wrkr/t.resize(h:600,w:510)/data/gas/21072022/410316769_A222_1.jpg",
      ],
    });
    await productController.create({
      name: "High Skinny Tight Two Jeans",
      brand: "Tommys",
      price: 2500,
      quantity: 0,
      description: "Best Skinny Fit Jeans in the market",
      sku: "J-004",
      category: cat2?._id,
      images: [
        "https://thumbs.dreamstime.com/b/blue-jeans-isolated-white-34440719.jpg",
      ],
    });
    await productController.create({
      name: "Black Four Tshirt",
      brand: "Zara",
      price: 1500,
      quantity: 10,
      description: "Best Tshirt in the market",
      sku: "t-004",
      category: cat1?._id,
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-teal-t-shirt-product-images-rvowvf0akl-0-202211051905.jpg?im=Resize=(500,630)",
        "https://thehouseofrare.com/cdn/shop/products/IMG_0053_5c650849-9d9d-4cc3-8863-6a23778cd9a0.jpg?v=1675170808",
      ],
    });
    await productController.create({
      name: "Blue Four Jeans",
      brand: "Zara",
      price: 2500,
      quantity: 5,
      description: "Best Jeans in the market",
      sku: "J-004",
      category: cat2?._id,
      images: [
        "https://cdn.pixelbin.io/v2/black-bread-289bfa/iix9pB/wrkr/t.resize(h:600,w:510)/data/gas/21072022/410316769_A222_1.jpg",
      ],
    });
    await productController.create({
      name: "High Skinny Tight Three Jeans",
      brand: "Tommys",
      price: 2500,
      quantity: 0,
      description: "Best Skinny Fit Jeans in the market",
      sku: "J-005",
      category: cat2?._id,
      images: [
        "https://thumbs.dreamstime.com/b/blue-jeans-isolated-white-34440719.jpg",
      ],
    });
    await productController.create({
      name: "Black Five Tshirt",
      brand: "Zara",
      price: 1500,
      quantity: 10,
      description: "Best Tshirt in the market",
      sku: "t-005",
      category: cat1?._id,
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-teal-t-shirt-product-images-rvowvf0akl-0-202211051905.jpg?im=Resize=(500,630)",
        "https://thehouseofrare.com/cdn/shop/products/IMG_0053_5c650849-9d9d-4cc3-8863-6a23778cd9a0.jpg?v=1675170808",
      ],
    });
    console.log("---------DONE----------");
  },
};
setup.initialize();
