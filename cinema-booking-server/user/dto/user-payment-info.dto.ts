import { Address } from "./user-address.dto";

export class Payment {
    paymentId: string;
    billingAddress: Address;
    cardNumber: string;
    expirationDate: string;
    cardHolderName: string;
    cvv: string;
}
