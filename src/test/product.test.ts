import * as productHandlers from "../handlers/product";
import prisma from "../db";

// Mock the Prisma client
jest.mock("../db", () => ({
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Product Handlers", () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { id: "1", name: "Product 1" },
        { id: "2", name: "Product 2" },
      ];
      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

      await productHandlers.getProducts(mockRequest, mockResponse);

      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockProducts });
    });

    it("should return 404 if no products found", async () => {
      (prisma.product.findMany as jest.Mock).mockResolvedValue(null);

      await productHandlers.getProducts(mockRequest, mockResponse);

      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "No products found",
      });
    });
  });

  describe("getProduct", () => {
    it("should return a single product", async () => {
      const mockProduct = { id: "1", name: "Product 1" };
      mockRequest.params = { id: "1" };
      (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

      await productHandlers.getProduct(mockRequest, mockResponse);

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      console.log(mockResponse.json);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockProduct });
    });

    it("should return 404 if product not found", async () => {
      mockRequest.params = { id: "1" };
      (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

      await productHandlers.getProduct(mockRequest, mockResponse);

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Product not found",
      });
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const mockProduct = { id: "1", name: "New Product" };
      mockRequest.body = { name: "New Product" };
      (prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);

      await productHandlers.createProduct(mockRequest, mockResponse);

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: { name: "New Product" },
      });
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockProduct });
    });

    it("should return 500 if creation fails", async () => {
      mockRequest.body = { name: "New Product" };
      (prisma.product.create as jest.Mock).mockRejectedValue(
        new Error("Creation failed")
      );

      await productHandlers.createProduct(mockRequest, mockResponse);

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: { name: "New Product" },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error creating product",
      });
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
      const mockUpdatedProduct = { id: "1", name: "Updated Product" };
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "Updated Product" };
      (prisma.product.update as jest.Mock).mockResolvedValue(
        mockUpdatedProduct
      );

      await productHandlers.updateProduct(mockRequest, mockResponse);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { name: "Updated Product" },
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockUpdatedProduct,
      });
    });

    it("should return 500 if update fails", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "Updated Product" };
      (prisma.product.update as jest.Mock).mockRejectedValue(
        new Error("Update failed")
      );

      await productHandlers.updateProduct(mockRequest, mockResponse);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { name: "Updated Product" },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error updating product",
      });
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product", async () => {
      const mockDeletedProduct = { id: "1", name: "Deleted Product" };
      mockRequest.params = { id: "1" };
      (prisma.product.delete as jest.Mock).mockResolvedValue(
        mockDeletedProduct
      );

      await productHandlers.deleteProduct(mockRequest, mockResponse);

      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockDeletedProduct,
      });
    });

    it("should return 500 if deletion fails", async () => {
      mockRequest.params = { id: "1" };
      (prisma.product.delete as jest.Mock).mockRejectedValue(
        new Error("Deletion failed")
      );

      await productHandlers.deleteProduct(mockRequest, mockResponse);

      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error deleting product",
      });
    });
  });
});
