import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { v4 as uuid } from 'uuid'
import bcrypt from "bcrypt"
import { User } from "@prisma/client";

export class UserService {
    static async register(req: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, req)

        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if (totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "Username already exist")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }

    static async login(req: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, req)

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if (!user) {
            throw new ResponseError(401, "Username or password is wrong")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password is wrong")
        }

        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username
            },
            data: {
                token: uuid()
            }
        })

        const response = toUserResponse(user)
        response.token = user.token!

        return response
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async update(user: User, req: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, req)

        if (updateRequest.name) {
            user.name = updateRequest.name
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: user
        })

        return toUserResponse(result)
    }

    static async logout(user: User): Promise<UserResponse>{
        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        })

        return toUserResponse(result)
    }
}