import { PartialType } from "@nestjs/swagger";
import { CreateCategoryRequestMessage } from "./create-category-request-message";

export class UpdateCategoryRequestMessage extends PartialType(CreateCategoryRequestMessage) {}
