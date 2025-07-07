import { Request, Response } from "express";
import { BrandsService } from "../services/brands";

export class BrandsController {
    static async getAll(req: Request, res: Response) {
        try {
            const brands = await BrandsService.getAll();
            if (!brands || brands.length === 0) {
                return res.status(404).json({ message: 'No brands found' })
            }

            res.json(brands);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const brand = await BrandsService.getById(id);
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' })
            }

            res.json(brand);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const data: {
                name: string
                nameAr: string
                logo: string
                logoAr?: string
                menus?: string[]
                labels?: string[]
            } = req.body

            const newBrand = await BrandsService.create(data)

            if (newBrand === true) {
                return res.status(409).json({ message: 'Brand already exists' })
            }

            res.status(201).json({ message: 'Brand successfully created' })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { data } = req.body

            const updatedBrand = await BrandsService.update(id, data)

            if (!updatedBrand) {
                return res.status(404).json({ message: 'Brand not found' })
            }

            res.status(200).json({ message: 'Brand updated successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deletedBrand = await BrandsService.delete(id)
            
            if (!deletedBrand) {
                return res.status(404).json({ message: 'Brand not found' })
            }

            return res.status(200).json({ message: 'Brand deleted successfully' })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}