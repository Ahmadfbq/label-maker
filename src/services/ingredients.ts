import { prisma } from "../lib/prisma";

export class IngredientService {
    static async getAll() {
        return await prisma.ingredient.findMany()
    }

    static async getById(id: string) {
        return await prisma.ingredient.findFirst({
            where: { id }
        })  
    }

    static async create(data: {
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

    }) {
        const ingredient = await prisma.ingredient.findFirst({
            where: {
                label: data.label,
                userId: data.userId
            }
        })

        if (ingredient) return true

        const nutrientData = data.nutrients.map(nutrientId => ({
            id: nutrientId
        }))

        const vitaminData = data.vitamins.map(vitaminId => ({
            id: vitaminId
        }))

        const mineralData = data.minerals.map(mineralId => ({
            id: mineralId
        }))

        return await prisma.ingredient.create({
            data: {
                label: data.label,
                labelAr: data.labelAr,
                description: data.description,
                descriptionAr: data.descriptionAr,
                userId: data.userId,
                calories: data.calories,
                nutrients: {
                    connect: nutrientData
                },
                vitamins: {
                    connect: vitaminData
                },
                minerals: {
                    connect: mineralData
                },
                private: data.private,
                active: data.active
            }
        })
    }

}