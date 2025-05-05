import { IsString, IsNumber, IsNotEmpty, IsPositive, IsArray } from "class-validator"
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

  @IsString()
  @ApiProperty({description: 'Image url of the product'})
  readonly imgUrl: string|undefined

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({description: 'Id of the brand the product belongs to'})
  readonly brandId: number

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({description: 'Array of category ids the product belongs to'})
  readonly categoryIds: []
}
