import { Address } from "./user-address.dto";

export class Payment {
    billingAddress: Address;
    cardNumber: string;
    expirationDate: string;
    cardHolderName: string;
    cvv: string;
}
