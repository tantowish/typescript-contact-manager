import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, UpdateAddressRequest, toAddressResponse, toAddressResponseArray } from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../app/database";
import { ContactService } from "./contact-service";
import { ResponseError } from "../error/response-error";

export class AddressService {
    static async checkAddressExist(id: string, contactId: string) {
        const address = await prismaClient.address.findUnique({
            where: {
                id: id,
                contact_id: contactId
            }
        })

        if (!address) {
            throw new ResponseError(404, "address not found")
        }

        return address
    }

    static async create(user: User, req: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, req)

        await ContactService.checkContactExist(createRequest.contact_id, user.username)

        const address = await prismaClient.address.create({
            data: createRequest
        })

        return toAddressResponse(address)
    }

    static async get(user: User, contactId: string, addressId: string): Promise<AddressResponse> {
        await ContactService.checkContactExist(contactId, user.username)

        const address = await prismaClient.address.findFirst({
            where:{
                id: addressId,
                contact_id: contactId
            }  
        })

        if(!address){
            throw new ResponseError(404, 'Address is not found')
        }

        return toAddressResponse(address)
    }

    static async update(user: User, req: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.UPDATE, req)

        await ContactService.checkContactExist(updateRequest.contact_id, user.username)

        await AddressService.checkAddressExist(updateRequest.id, updateRequest.contact_id)

        const address = await prismaClient.address.update({
            where:{
                id: updateRequest.id,
            },
            data:updateRequest
        })

        return toAddressResponse(address)
    }

    static async delete(user: User, contactId: string, addressId: string): Promise<AddressResponse> {
        await ContactService.checkContactExist(contactId, user.username)

        await AddressService.checkAddressExist(addressId, contactId)

        const address = await prismaClient.address.delete({
            where:{
                id: addressId
            }
        })

        return toAddressResponse(address)
    }

    static async list(user: User, contactId:string): Promise<AddressResponse[]> {
        await ContactService.checkContactExist(contactId, user.username)

        const addresses = await prismaClient.address.findMany({
            where: {
                contact_id: contactId
            }
        })

        return toAddressResponseArray(addresses)
    }
}