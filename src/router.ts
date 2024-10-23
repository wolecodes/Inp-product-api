import { Router } from "express";
import { body } from "express-validator";
import { handleInputError } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
const router = Router();

//Create product route

// GET handler for getting all products.
router.get("/product", getProducts);

// GET handler for getting a product by ID.
router.get("/product/:id", getProduct);

// PUT handler for updating a product name by ID.
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct
);

// POST handler for creating product.
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  createProduct
);
//DELETE handler to delete product by ID
router.delete("/product/:id", deleteProduct);

export default router;
