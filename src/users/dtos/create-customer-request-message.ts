import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsPositive, IsEmpty, IsOptional } from "class-validator"

export class CreateCustomerRequestMessage {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Phone of the customer' })
  readonly phone: string

  // @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'Related user id' })
  readonly userId?: number
}
