import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserRequestMessage {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Full name of the user' })
  readonly name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Email of the user' })
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Password of the user' })
  readonly passwd: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Role of the user, as string' })
  readonly role: string
}
