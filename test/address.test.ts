import { Address, Contact } from "@prisma/client";
import { AddressTest, ContactTest, UserTest } from "./test.util";
import supertest from "supertest";
import { app } from "../src/app/app";
import { logger } from "../src/app/logging";

describe('POST /api/contacts/:addressId/addresses', () => {
    let contact: Contact;
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        contact = await ContactTest.get()
    })

    afterEach(async () => {
        await AddressTest.deleteAll(contact.id)
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('Should be able to create address', async () => {
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "test",
                city: "test",
                province: "test",
                country: "test",
                postal_code: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.street).toBe("test")
        expect(response.body.data.city).toBe("test")
        expect(response.body.data.province).toBe("test")
        expect(response.body.data.country).toBe("test")
        expect(response.body.data.postal_code).toBe("test")
    });

    it('Should reject create address if contact is not uuid', async () => {
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id + "1"}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "test",
                city: "test",
                province: "test",
                country: "test",
                postal_code: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });

    it('Should reject create address if contact is not found', async () => {
        contact.id = "914fdb44-b941-4017-8a22-0e29b47046fe" // Fake id
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "test",
                city: "test",
                province: "test",
                country: "test",
                postal_code: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });

    it('Should reject create address if request is invalid', async () => {
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "",
                city: "",
                province: "",
                country: "",
                postal_code: ""
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });
})

describe('GET /api/contacts/:contactId/addresses/:addressId', () => { 
    let contact: Contact;
    let address: Address;
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        contact = await ContactTest.get()
        await AddressTest.create(contact.id)
        address = await AddressTest.get(contact.id)
    })

    afterEach(async () => {
        await AddressTest.deleteAll(contact.id)
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('Should be able to get address', async () => {
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.street).toBe("test")
        expect(response.body.data.city).toBe("test")
        expect(response.body.data.province).toBe("test")
        expect(response.body.data.country).toBe("test")
        expect(response.body.data.postal_code).toBe("test")
    });

    it('Should reject get address if contactId is invalid', async () => {
        const contactId = '914fdb44-b941-4017-8a22-0e29b47142fe' // Fake contact id
        const response = await supertest(app)
            .get(`/api/contacts/${contactId}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')
        
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });

    it('Should reject get address if addressId is invalid', async () => {
        const addressId = '914fdb44-b941-4017-8a22-0e29b47142fe' // Fake contact id
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}/addresses/${addressId}`)
            .set('X-API-TOKEN', 'test')
        
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });
})