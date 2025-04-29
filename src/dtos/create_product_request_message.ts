import { IsString, IsNumber, IsNotEmpty, IsPositive } from "class-validator"

export class CreateProductRequestMessage {
  @IsNotEmpty()
  @IsString()
  readonly name: string
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number
}
