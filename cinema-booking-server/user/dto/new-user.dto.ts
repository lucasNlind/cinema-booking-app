import { Address } from "./user-address.dto";
import { Payment } from "./user-payment-info.dto";

export class NewUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    homeAddress: Address;
    paymentInfo: Payment[];
    password: string;
    isSubscribed: boolean;
}
