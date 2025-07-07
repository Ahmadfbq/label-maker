import { Request, Response } from "express";
import { MenusService } from "../services/menus";

export class MenusController {
    static async getAll(req: Request, res: Response) {
        try {
            const menus = await MenusService.getAll()
            if (!menus || menus.length === 0) {
                return res.status(404).json({ message: 'No menus found' })
            }

            res.json(menus)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params

            const menu = await MenusService.getById(id)
            if (!menu) {
                return res.status(404).json({ message: 'Menu not found' })
            }

            res.json(menu)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const data: {
                name: string
                nameAr: string
                brandId: string
                sections: string[]
            } = req.body

            const newMenu = await MenusService.create(data)

            if (newMenu === true) {
                return res.status(409).json({ message: 'Menu already exists' })
            }

            res.status(201).json({ message: 'Menu successfully created' })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async update(req: Request, res: Response) {
        try {
        const { id } = req.params
        const { data } = req.body

        const updatedMenu = await MenusService.update(id, data)

        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu not found' })
        }

        res.status(200).json({ message: 'Menu successfully updated' })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deletedMenu = await MenusService.delete(id)

            if (!deletedMenu) {
                return res.status(404).json({ message: 'Menu not found' })
            }

            res.status(200).json({ message: 'Menu successfully deleted' })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}