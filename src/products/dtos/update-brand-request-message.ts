import { PartialType } from "@nestjs/swagger";
import { CreateBrandRequestMessage } from "./create-brand-request-message";

export class UpdateBrandRequestMessage extends PartialType(CreateBrandRequestMessage) {}
