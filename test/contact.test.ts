import supertest from "supertest"
import { ContactTest, UserTest } from "./test.util"
import { app } from "../src/app/app"
import { logger } from "../src/app/logging"

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('Should be able to create new contact', async () => {
        const response = await supertest(app)
            .post('/api/contacts')
            .set('X-API-TOKEN', "test")
            .send({
                firstName: "Askar",
                lastName: "Daffa",
                email: "askar001@gmail.com",
                phone: "08952525212"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.firstName).toBe("Askar")
        expect(response.body.data.lastName).toBe("Daffa")
        expect(response.body.data.email).toBe("askar001@gmail.com")
        expect(response.body.data.phone).toBe("08952525212")
    })

    it('Should reject create contact if token is invalid', async () => {
        const response = await supertest(app)
            .post('/api/contacts')
            .set('X-API-TOKEN', "tokensalah")
            .send({
                firstName: "Askar",
                lastName: "Daffa",
                email: "askar001@gmail.com",
                phone: "08952525212"
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBe("Unauthorized")
    })

    it('Should reject create contact if request is invalid', async () => {
        const response = await supertest(app)
            .post('/api/contacts')
            .set('X-API-TOKEN', "test")
            .send({
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts/:id', () => {
    let contactId: string;
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        contactId = (await ContactTest.get()).id
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("Should be able to get contact", async () => {
        const response = await supertest(app)
            .get(`/api/contacts/${contactId}`)
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(contactId)
        expect(response.body.data.firstName).toBe("test")
        expect(response.body.data.lastName).toBe("test")
        expect(response.body.data.email).toBe("test@example.com")
        expect(response.body.data.phone).toBe("0823194")
    })

    it("Should reject get contact if token is invalid", async () => {
        const response = await supertest(app)
            .get(`/api/contacts/${contactId}`)
            .set('X-API-TOKEN', "tokensalah")

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBe("Unauthorized")
    })

    it("Should reject get contact if contact is not found", async () => {
        const response = await supertest(app)
            .get(`/api/contacts/${contactId + "abc"}`)
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe('PUT /api/contacts/:id', () => {
    let contactId: string;
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        contactId = (await ContactTest.get()).id
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('Should be able to update contact ', async () => {
        const response = await supertest(app)
            .put(`/api/contacts/${contactId}`)
            .set('X-API-TOKEN', "test")
            .send({
                firstName: "Askar",
                lastName: "Daffa",
                email: "askar001@gmail.com",
                phone: "08952525212"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(contactId)
        expect(response.body.data.firstName).toBe("Askar")
        expect(response.body.data.lastName).toBe("Daffa")
        expect(response.body.data.email).toBe("askar001@gmail.com")
        expect(response.body.data.phone).toBe("08952525212")
    });

    it('Should reject update contact if contact is not found ', async () => {
        contactId = "45b48e15-f976-43f8-b38e-192b1524ee85"
        const response = await supertest(app)
            .put(`/api/contacts/${contactId}`)
            .set('X-API-TOKEN', "test")
            .send({
                firstName: "Askar",
                lastName: "Daffa",
                email: "askar001@gmail.com",
                phone: "08952525212"
            })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });
})

describe('DELETE /api/contacts/:id', () => {
    let contactId: string;
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        contactId = (await ContactTest.get()).id
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('Should be able to delete contact', async () => {
        const response = await supertest(app)
            .delete(`/api/contacts/${contactId}`)
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("success")
    });

    it('Should reject delete contact if contact is not found', async () => {
        const response = await supertest(app)
            .delete(`/api/contacts/${contactId + "sdads"}`)
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });
})

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('Should be able to search contact', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('Should be able to search contact using name', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({
                name: "es"
            })
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('Should be able to search contact using email', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({
                email: ".com"
            })
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('Should be able to search contact using phone', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({
                phone: "94"
            })
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('Should be able to search contact with no result', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({
                name: "salah"
            })
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(0)
        expect(response.body.paging.size).toBe(10)
    })

    it('Should be able to search contact with paging', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({
                page: 2,
                size: 1
            })
            .set('X-API-TOKEN', "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0)
        expect(response.body.paging.current_page).toBe(2)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(1)
    })
})