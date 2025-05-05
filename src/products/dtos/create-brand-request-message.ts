import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateBrandRequestMessage {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of the brand' })
  readonly name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'URL of the brand image' })
  readonly imageSrc: string
}
