import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, toAddressResponse } from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../app/database";
import { ContactService } from "./contact-service";
import { ResponseError } from "../error/response-error";

export class AddressService {
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
}