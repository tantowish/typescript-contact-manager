import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ContactResponse, CreateContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";
import { logger } from "../app/logging";

export class ContactService {
    static async getContactByIdAndUsername(id: string, username: string){
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: id,
                username: username
            }
        })

        if (!contact) {
            throw new ResponseError(404, "Contact not found")
        }   
        
        return contact
    }

    static async create(user: User, req: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, req)

        const record = {
            ...createRequest,
            ...{ username: user.username }
        }
        const contact = await prismaClient.contact.create({
            data: record
        })

        return toContactResponse(contact)
    }

    static async get(user: User, id: string): Promise<ContactResponse> {
        const contact = await this.getContactByIdAndUsername(id, user.username)

        return toContactResponse(contact)
    }

    static async update(user: User, req: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, req)

        await this.getContactByIdAndUsername(updateRequest.id, user.username)

        const contact = await prismaClient.contact.update({
            where:{
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        })
        
        return toContactResponse(contact)
    }

    static async delete(user: User, id:string): Promise<ContactResponse> {
        await this.getContactByIdAndUsername(id, user.username)

        const contact = await prismaClient.contact.delete({
            where:{
                id:id,
                username: user.username
            }
        })

        return toContactResponse(contact)

    }
}