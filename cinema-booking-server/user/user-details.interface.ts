import { Address } from "./dto/user-address.dto";
import { Payment } from "./dto/user-payment-info.dto";

export interface UserDetails {
    id: string;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    homeAddress: Address;
    paymentInfo: Payment[];
    phoneNumber: string;
    isSubscribed: boolean;
    isActive: boolean;
}