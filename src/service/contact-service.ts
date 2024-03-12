import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ContactResponse, CreateContactRequest, SearchContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

export class ContactService {
    static async checkContactExist(id: string, username: string) {
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

        const data = {
            ...createRequest,
            ...{ username: user.username }
        }
        const contact = await prismaClient.contact.create({
            data: data
        })

        return toContactResponse(contact)
    }

    static async get(user: User, id: string): Promise<ContactResponse> {
        const contact = await this.checkContactExist(id, user.username)

        return toContactResponse(contact)
    }

    static async update(user: User, req: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, req)

        await this.checkContactExist(updateRequest.id, user.username)

        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        })

        return toContactResponse(contact)
    }

    static async delete(user: User, id: string): Promise<ContactResponse> {
        await this.checkContactExist(id, user.username)

        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        })

        return toContactResponse(contact)
    }

    static async search(user: User, req: SearchContactRequest): Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate(ContactValidation.SEARCH, req)
        const skip = (searchRequest.page - 1) * searchRequest.size

        const filters = []
        // Check if name exist
        if (searchRequest.name) {
            filters.push({
                OR: [
                    {
                        firstName: {
                            contains: searchRequest.name
                        },
                        lastName: {
                            contains: searchRequest.name
                        },
                    }
                ]
            })
        }
        // Check if email exist
        if(searchRequest.email){
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        // Check if phone exist
        if(searchRequest.phone){
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            })
        }

        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        })

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            },
        })

        return {
            data: contacts.map(contact => toContactResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
}