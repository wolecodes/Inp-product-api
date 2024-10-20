import prisma from "../db";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({});
    if (products === null) {
      res.status(404).json({ message: "No products found" });
      return;
    }
    res.json({products});
  } catch (error) {
    console.error("Error Getting products", error);
  }
};

