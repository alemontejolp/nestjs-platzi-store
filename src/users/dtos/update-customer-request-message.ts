import { PartialType } from "@nestjs/swagger";
import { CreateCustomerRequestMessage } from "./create-customer-request-message";

export class UpdateCustomerRequestMessage extends PartialType(CreateCustomerRequestMessage) {}
