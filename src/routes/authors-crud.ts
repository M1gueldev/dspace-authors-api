import { PrismaClient } from '@prisma/client'
import type { Author } from '@prisma/client'

export const prisma = new PrismaClient()

export function Create(author: Author) {
    return prisma.author.create({
        data: author
    })
}

export function Read(id: number) {
    return prisma.author.findUnique({
        where: {
            id
        }
    })
}

export const Update = (data: Partial<Author>, id: number) => prisma.author.update({
    where: {
        id
    },
    data: {
        ...data
    }
})

export function Delete(id: number) {
    return prisma.author.delete({
        where: {
            id
        }
    })
}

export function getAll() {
    return prisma.author.findMany()
}
