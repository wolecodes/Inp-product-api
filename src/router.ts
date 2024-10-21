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

router.get("/product", getProducts);
router.get("/product/:id", getProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  createProduct
);
router.delete("/product/:id", deleteProduct);

export default router;
