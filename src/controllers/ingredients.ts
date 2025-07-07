import { Request, Response } from 'express'
import { IngredientsService } from '../services/ingredients'

/*
    IngredientController class provides methods to handle HTTP requests related to ingredients.
    It includes methods to get all ingredients, get an ingredient by ID, create a new ingredient,
    update an existing ingredient, and delete an ingredient.
*/
export class IngredientController {
    static async getAll(req: Request, res: Response) {
        try {
            const ingredients = await IngredientsService.getAll()
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

      const ingredient = await IngredientsService.getById(id)
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

        const newIngredient = await IngredientsService.create(data)

        if (newIngredient === true) {
            return res.status(409).json({ message: 'Ingredient already created' })
        }

        res.status(201).json({ message: 'Ingredient successfully created' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { data } = req.body

      const updatedIngredient = await IngredientsService.update(id, data)
      if (!updatedIngredient) {
        return res.status(404).json({ message: 'Ingredient not found' })
      }

      res.json({ message: 'Ingredient successfully updated' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const deletedIngredient = await IngredientsService.delete(id)
      if (!deletedIngredient) {
        return res.status(404).json({ message: 'Ingredient not found' })
      }

      res.json({ message: 'Ingredient successfully deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
