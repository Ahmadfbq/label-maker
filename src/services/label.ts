import { prisma } from "../lib/prisma";

export class LabelService {
    static async getAll() {
        return await prisma.label.findMany()
    }

    static async getById(id: string) {
        return await prisma.label.findFirst({
            where: { id }
        })
    }

    static async create(data: {
        name: string
        ingredients: string[]
        allergens: string[]
        labelOptions?: { vitamin_d?: boolean }
        userId: string
    }) {
        const label = await prisma.label.findFirst({
            where: {
                name: data.name,
                userId: data.userId
            }
        })

        if (label) return true

        const ingredientData = data.ingredients.map(ingredientId => ({
            id: ingredientId
        }))

        const allergenData = data.allergens.map(allergenId => ({
            id: allergenId
        }))

        return await prisma.label.create({
            data: {
                name: data.name,
                userId: data.userId,
                ingredients: {
                    connect: ingredientData
                },
                allergens: {
                    connect: allergenData
                },
                labelOptions: {
                    create: data.labelOptions
                }

            }
        })
    }
}