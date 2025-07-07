import { prisma } from "../lib/prisma";

export class MenusService {
    static async getAll() {
        return await prisma.menu.findMany()
    }

    static async getById(id: string) {
        return await prisma.menu.findFirst({
            where: { id }
        })
    }

    static async create(data: {
        name: string
        nameAr: string
        brandId: string
        sections: string[]
    }) {
        const menu = await prisma.menu.findFirst({
            where: {
                name: data.name,
                brandId: data.brandId
            }
        })

        if (menu) return true

        const sectionData = data.sections?.map(sectionId => ({
            id: sectionId
        }))
        
        return await prisma.menu.create({
            data: {
                name: data.name,
                nameAr: data.nameAr,
                brandId: data.brandId,
                sections: {
                    connect: sectionData
                }
            }
        })
    }

    static async update(id: string, data: {
        name?: string
        nameAr?: string
        brandId?: string
        sections?: string[]
    }) {
        const menu = await prisma.menu.findFirst({
            where: { id }
        })
        
        if (!menu) return false
        const sectionData = data.sections?.map(sectionId => ({
            id: sectionId
        })) ?? []

        return await prisma.menu.update({
            where: { id },
            data: {
                name: data.name ?? menu.name,
                nameAr: data.nameAr ?? menu.nameAr,
                brandId: data.brandId ?? menu.brandId,
                sections: {
                    set: sectionData
                }
            }
        })
    }

    static async delete(id: string) {
        const menu = await prisma.menu.findFirst({
            where: { id }
        })

        if (!menu) return false

        return await prisma.menu.delete({
            where: { id }
        })
    }
}