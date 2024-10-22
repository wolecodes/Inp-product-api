import prisma from "../db";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({});
    if (products === null) {
      res.status(404).json({ message: "No products found" });
      return;
    }
    res.json({ data: products });
  } catch (error) {
    console.error("Error Getting products", error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (product === null) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    console.error("Error getting product", error);
    res.status(500).json({ message: "Error getting product" });
  }
};
export const createProduct = async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: { name: req.body.name },
    });

    res.json({ data: product });
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    });
    res.json({ data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
