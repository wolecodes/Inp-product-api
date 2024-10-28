import prisma from "../db";

// Function to parse fields (query pa

function parseFields(fields: string) {
  return fields
    .split(",")
    .reduce((acc, field) => ({ ...acc, [field]: true }), {});
}
/**
 * Route handler to get all products
 * @param {object} req - request object
 * @param {object} res - response object
 */

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

/**
 *  handles to get a single products
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const getProduct = async (req, res) => {
  try {
    const { fields } = req.query;
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
      select: fields ? parseFields(fields as string) : undefined,
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

/**
 *  handles  create product
 * @param {object} req - request object
 * @param {object} res - response object
 */

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

/**
 *   update product
 * @param {object} req - request object
 * @param {object} res - response object
 */

export const updateProduct = async (req, res) => {
  try {
    const { fields } = req.query;
    // @ts-ignore
    const updated = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
      select: fields ? parseFields(fields as string) : undefined,
    });
    res.json({ data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

/**
 *  handles to delete a single product
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const deleteProduct = async (req, res) => {
  try {
    const { fields } = req.query;
    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
      },
      select: fields ? parseFields(fields as string) : undefined,
    });
    res.json({ data: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
