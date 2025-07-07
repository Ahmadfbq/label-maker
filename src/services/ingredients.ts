import { prisma } from "../lib/prisma";

/*
*/
export class IngredientService {
    static async getAll() { // Fetches all ingredients from the database as an array, no filtering no sorting or pagination
        return await prisma.ingredient.findMany()
    }

    static async getById(id: string) {
        return await prisma.ingredient.findFirst({ // Fetches a single ingredient by its unique ID, if it exists
            where: { id }
        })  
    }

    static async create(data: { // Creates a new ingredient in the database
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

    // Updates an existing ingredient by its ID, if it exists
    static async update(id: string, data: {
        label?: string
        labelAr?: string
        description?: string
        descriptionAr?: string
        userId?: string
        calories?: number
        nutrients?: number[]
        vitamins?: number[]
        minerals?: number[]
        private?: boolean
        active?: boolean
    }) {
        const ingredient = await prisma.ingredient.findUnique({
            where: { id }
        })

        if (!ingredient) return false
        const nutrientData = data.nutrients?.map(nutrientId => ({
            id: nutrientId
        })) ?? []

        const vitaminData = data.vitamins?.map(vitaminId => ({
            id: vitaminId
        })) ?? []

        const mineralData = data.minerals?.map(mineralId => ({
            id: mineralId
        })) ?? []

        // the ?? operator is used to check if the data is provided, 
        // if not, it keeps the existing value from the ingredient
        return await prisma.ingredient.update({
            where: { id },
            data: {
                label: data.label ?? ingredient.label,
                labelAr: data.labelAr ?? ingredient.labelAr,
                description: data.description ?? ingredient.description,
                descriptionAr: data.descriptionAr ?? ingredient.descriptionAr,
                userId: data.userId ?? ingredient.userId,
                calories: data.calories ?? ingredient.calories,
                nutrients: {
                    connect: nutrientData
                },
                vitamins: {
                    connect: vitaminData
                },
                minerals: {
                    connect: mineralData
                },
                private: data.private ?? ingredient.private,
                active: data.active ?? ingredient.active
            }
        })
    }

    // Deletes an ingredient by its ID, if it exists
    static async delete(id: string) {
        const ingredient = await prisma.ingredient.findUnique({
            where: { id }
        })

        if (!ingredient) return false
        
        return await prisma.ingredient.delete({
            where: { id }
        })
    }
}