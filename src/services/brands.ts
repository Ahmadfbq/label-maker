import { prisma } from "../lib/prisma";

export class BrandsService {
    static async getAll() {
        return await prisma.brand.findMany();
    }

    static async getById(id: string) {
        return await prisma.brand.findFirst({
            where: { id }
        })
    }

    static async create(data: {
        name: string
        nameAr: string
        logo: string
        logoAr?: string
        menus?: string[]
        labels?: string[]
    }) {
        const brand = await prisma.brand.findFirst({
            where: { 
                name: data.name, 
                nameAr: data.nameAr
            }
        })

        if (brand) return true;

        const menuData = data.menus?.map(menuId => ({
            id: menuId
        }))

        const labelData = data.labels?.map(labelId => ({
            id: labelId
        }))

        return await prisma.brand.create({
            data: {
                name: data.name,
                nameAr: data.nameAr,
                logo: data.logo,
                logoAr: data.logoAr,
                menus: {
                    connect: menuData
                },
                labels: {
                    connect: labelData
                }
            }
        })
    }

    static async update(id: string, data: {
        name?: string
        nameAr?: string
        logo?: string
        logoAr?: string
        menus?: string[]
        labels?: string[]
    }) {
        const brand = await prisma.brand.findUnique({
            where: { id }
        })

        if (!brand) return false;
        const menuData = data.menus?.map(menuId => ({
            id: menuId
        })) ?? [];

        const labelData = data.labels?.map(labelId => ({
            id: labelId
        })) ?? [];

        return await prisma.brand.update({
            where: { id },
            data: {
                name: data.name ?? brand.name,
                nameAr: data.nameAr ?? brand.nameAr,
                logo: data.logo ?? brand.logo,
                logoAr: data.logoAr ?? brand.logoAr,
                menus: {
                    set: menuData
                },
                labels: {
                    set: labelData
                }
            }
        })
    }

    static async delete(id: string) {
        const brand = await prisma.brand.findUnique({
            where: { id }
        })
        
        if(!brand) return false;
        
        return await prisma.brand.delete({
            where: { id }
        })
    }
}