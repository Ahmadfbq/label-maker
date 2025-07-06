import { Request, Response } from 'express'
import { LabelService } from '../services/label'

export class LabelController {
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const label = await LabelService.getById(id)
      if (!label) {
        return res.status(404).json({ message: 'Label not found' })
      }

      res.json(label)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data: {
        name: string
        userId: string
        ingredients: string[]
        allergens: string[]
        labelOptions: {
          vitamin_d: boolean
        }
      } = req.body

      const newLabel = await LabelService.create(data)

      if (newLabel === true) {
        return res.status(409).json({ message: 'Label already created' })
      }

      res.status(201).json({ message: 'Label successfully created' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
