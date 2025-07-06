import { Request, Response } from 'express'
import { IngredientService } from '../services/ingredient'

export class IngredientController {
    static async getAll(req: Request, res: Response) {
        try {
            const ingredients = await IngredientService.getAll()
            if (!ingredients || ingredients.length === 0) {
                return res.status(404).json({ message: 'No ingredients found' })
            }

            res.json(ingredients)  
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const ingredient = await IngredientService.getById(id)
      if (!ingredient) {
        return res.status(404).json({ message: 'Ingredient not found' })
      }

      res.json(ingredient)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async create(req: Request, res: Response) {
    try {
        const data: {
            label: string
            labelAr: string
            description?: string
            descriptionAr?: string
            userId?: string
            calories: number
            nutrients: number[]
            vitamins: number[]
            minerals: number[]
            private: boolean
            active: boolean
        } = req.body

        const newIngredient = await IngredientService.create(data)

        if (newIngredient === true) {
            return res.status(409).json({ message: 'Ingredient already created' })
        }

        res.status(201).json({ message: 'Ingredient successfully created' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
  }
}
