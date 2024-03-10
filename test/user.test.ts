import supertest from "supertest"
import { app } from "../src/app/app"
import { logger } from "../src/app/logging"
import { UserTest } from "./test.util"
import bcrypt from "bcrypt"
import { response } from "express"

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(app)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: ""
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should register new user', async () => {
        const response = await supertest(app)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
    })
})

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('Should be able to login', async () => {
        const response = await supertest(app)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.token).toBeDefined()
    })

    it('Should be able reject if username is wrong', async () => {
        const response = await supertest(app)
            .post("/api/users/login")
            .send({
                username: "usernamesalah",
                password: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined
    })

    it('Should be able reject if password is wrong', async () => {
        const response = await supertest(app)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "passwordsalah"
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined
    })
})

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('Should be able to get user', async () => {
        const response = await supertest(app)
            .get("/api/users/current")
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
    })

    it('Should reject get user if token is invalid', async () => {
        const response = await supertest(app)
            .get("/api/users/current")
            .set('X-API-TOKEN', "tokensalah")

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('Should reject update user if request is invalid', async () => {
        const response = await supertest(app)
            .patch("/api/users/current")
            .set('X-API-TOKEN', "test")
            .send({
                name: "",
                password: ""
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('Should reject update user if token is wrong', async () => {
        const response = await supertest(app)
            .patch("/api/users/current")
            .set('X-API-TOKEN', "tokensalah")
            .send({
                name: "test",
                password: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it('Should be able to update user name', async () => {
        const response = await supertest(app)
            .patch("/api/users/current")
            .set('X-API-TOKEN', "test")
            .send({
                name: "benar",
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("benar")
    })

    it('Should be able to update user password', async () => {
        const response = await supertest(app)
            .patch("/api/users/current")
            .set('X-API-TOKEN', "test")
            .send({
                password: "benar",
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)

        const user = await UserTest.get()
        expect(await bcrypt.compare('benar', user.password)).toBe(true)
    })
})

describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('Should be able to logout', async () => {
        const response = await supertest(app)
            .delete("/api/users/logout")
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("success")

        const user = await UserTest.get()
        expect(user.token).toBe(null)
    })

    it('Should reject logout if user token is wrong', async () => {
        const response = await supertest(app)
            .delete("/api/users/logout")
            .set('X-API-TOKEN', "tokensalah")

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})