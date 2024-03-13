import { Address } from "@prisma/client"

export type AddressResponse = {
    id: string,
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string
}

export type CreateAddressRequest = {
    contact_id: string,
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string
}

export type UpdateAddressRequest = {
    id: string,
    contact_id: string,
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string
}

export function toAddressResponse(address: Address): AddressResponse {
    return {
        id: address.id,
        street: address.street!,
        city: address.city!,
        province: address.province!,
        country: address.country,
        postal_code: address.postal_code,
    }
}

export function toAddressResponseArray(addresses: Address[]): AddressResponse[] {
    return addresses.map(address => ({
        id: address.id,
        street: address.street!,
        city: address.city!,
        province: address.province!,
        country: address.country,
        postal_code: address.postal_code,
        contact_id: address.contact_id
    }));
}