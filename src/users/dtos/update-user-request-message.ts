import { PartialType } from "@nestjs/swagger";
import { CreateUserRequestMessage } from "./create-user-request-message";

export class UpdateUserRequestMessage extends PartialType(CreateUserRequestMessage) {
}
