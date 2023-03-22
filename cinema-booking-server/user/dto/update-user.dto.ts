import { Address } from "./user-address.dto";

export class UpdateUserDTO {
    email: string;
    newFirstName: string;
    newLastName: string;
    newPhoneNumber: string;
    newHomeAddress: Address;
    newIsSubscribed: boolean;
}
