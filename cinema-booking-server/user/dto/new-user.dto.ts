import { Address } from "./user-address.dto";

export class NewUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: Address[];
    password: string;
    isSubscribed: boolean;
}
