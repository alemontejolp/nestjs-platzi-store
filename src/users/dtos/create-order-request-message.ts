import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderRequestMessage {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Id of the customer the order belongs to' })
  readonly customerId: number
}
