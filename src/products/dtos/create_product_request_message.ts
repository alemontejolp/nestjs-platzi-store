import { IsString, IsNumber, IsNotEmpty, IsPositive } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProductRequestMessage {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'User email'})
  readonly name: string
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({description: 'Unit price of the product'})
  readonly price: number
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({description: 'Stock number'})
  readonly stock: number
}
