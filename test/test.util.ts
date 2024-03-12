import { User } from "@prisma/client";
import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt"

export class UserTest {
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                password: await bcrypt.hash("test", 10),
                name: 'test',
                token: "test"
            }
        })
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: "test"
            }
        })

        if (!user) {
            throw new Error("User is not found")
        }

        return user;
    }
}

export class ContactTest {
    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    static async create() {
        await prismaClient.contact.create({
            data: {
                firstName: "test",
                lastName: "test",
                email: "test@example.com",
                phone: "0823194",
                username: "test"
            }
        })
    }

    static async get(){
        const contact = await prismaClient.contact.findFirst({
            where: {
                username: "test"
            }
        })

        if (!contact) {
            throw new Error("Contact is not found")
        }

        return contact;
    }
}