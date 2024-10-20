import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputError } from "./modules/middleware";
const router = Router();

//Create product route

router.get("/product", () => {});
router.get("/product/:id", () => {});

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  (req, res) => {}
);
router.post("/product", body("name").isString(), handleInputError, () => {});
router.delete("/product/:id", () => {});

export default router;
