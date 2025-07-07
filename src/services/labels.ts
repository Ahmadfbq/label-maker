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
        labelOptions?: {
            vitamin_d?: boolean
            vitamin_b12?: boolean
            vitamin_c?: boolean
            calcium?: boolean
            iron?: boolean
        }
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
                    create: data.labelOptions || {}  
                }
            }
        })
    }

    static async update(id: string, data: {
        name?: string
        ingredients?: string[]
        allergens?: string[]
        labelOptions?: {
            vitamin_d?: boolean
            vitamin_b12?: boolean
            vitamin_c?: boolean
            calcium?: boolean
            iron?: boolean
        }
        userId?: string
    }) {
        const label = await prisma.label.findUnique({
            where: { id }
        })

        if (!label) return false
        const ingredientData = data.ingredients?.map(ingredientId => ({
            id: ingredientId
        })) ?? []

        const allergenData = data.allergens?.map(allergenId => ({
            id: allergenId
        })) ?? []

        return await prisma.label.update({
            where: { id },
            data: {
                name: data.name ?? label.name,
                ingredients: {
                    set: ingredientData
                },
                allergens: {
                    set: allergenData
                },
                labelOptions: {
                    upsert: {
                        create: data.labelOptions ?? {},
                        update: data.labelOptions ?? {}
                    }
                }
            }
        })
    }

    static async delete(id: string) {
        const label = await prisma.label.findUnique({
            where: { id }
        })

        if (!label) return false

        return await prisma.label.delete({
            where: { id }
        })
    }
}