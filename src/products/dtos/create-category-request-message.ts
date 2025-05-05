import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryRequestMessage {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of the category' })
  readonly name: string
}
