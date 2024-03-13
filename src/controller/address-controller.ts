import { NextFunction, Response, response } from "express"
import { UserRequest } from "../type/user-request"
import { CreateAddressRequest, UpdateAddressRequest } from "../model/address-model"
import { AddressService } from "../service/address-service"

export class AddressController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest
            request.contact_id = req.params.contactId
            const response = await AddressService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await AddressService.get(req.user!, req.params.contactId, req.params.addressId)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateAddressRequest = req.body as UpdateAddressRequest
            request.id = req.params.addressId
            request.contact_id = req.params.contactId
            const response = await AddressService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await AddressService.delete(req.user!, req.params.contactId, req.params.addressId)

            res.status(200).json({
                message: "success"
            })
        } catch (e){
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction){
        try {
            const response = await AddressService.list(req.user!, req.params.contactId)

            res.status(200).json({
                data:response
            })

        } catch (e) {
            next(e)
        }
    }
}