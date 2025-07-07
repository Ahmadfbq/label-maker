import { Request, Response } from 'express'
import { LabelsService } from '../services/labels'

export class LabelsController {
  static async getAll(req: Request, res: Response) {
    try {
      const labels = await LabelsService.getAll()
      if (!labels || labels.length === 0) {
        return res.status(404).json({ message: 'No labels found'})
      }

      res.json(labels)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const label = await LabelsService.getById(id)
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
        brandId?: string
        ingredients: string[]
        allergens: string[]
        labelOptions?: {
          vitamin_d?: boolean
          vitamin_b12?: boolean
            vitamin_c?: boolean
            calcium?: boolean
            iron?: boolean
        }
        sectionId?: string
      } = req.body

      const newLabel = await LabelsService.create(data)

      if (newLabel === true) {
        return res.status(409).json({ message: 'Label already created' })
      }

      res.status(201).json({ message: 'Label successfully created' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { data } = req.body

      const updatedLabel = await LabelsService.update(id, data)
      if (!updatedLabel) {
        return res.status(404).json({ message: 'Label not found' })
      }

      res.json({ message: 'Label successfully updated' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deletedLabel = await LabelsService.delete(req.params.id)
      if (!deletedLabel) {
        return res.status(404).json({ message: 'Label not found' })
      }

      res.json({ message: 'Label successfully deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
