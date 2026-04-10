import { Request, Response } from "express";
import { productService } from "./product.service";

export const productController = {
    createProduct: async (req: Request, res: Response) => {
        try {
            const { name, price } = req.body;
            const product = await productService.createProduct(name, price);
            res.status(201).json(product);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },

    getProducts: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },

    getProductById: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid product id' });

        try {
            const product = await productService.getProductById(id);
            res.status(200).json(product);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    },

    updateProduct: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid product id' });

        try {
            const product = await productService.updateProduct(id, req.body);
            res.status(200).json(product);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    },

    deleteProduct: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid product id' });

        try {
            await productService.deleteProduct(id);
            res.status(204).send(); 
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    }
};