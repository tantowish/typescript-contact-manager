import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"

export class UserSerivce{
    static async register(req: CreateUserRequest) : Promise<UserResponse>{
        const registerRequest = Validation.validate(UserValidation.REGISTER, req)

        const totalUserWithSameUsername = await prismaClient.user.count({
            where:{
                username: registerRequest.username
            }
        })

        if(totalUserWithSameUsername != 0){
            throw new ResponseError(400, "Username already exist")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }
}