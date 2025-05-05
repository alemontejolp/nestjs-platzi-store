import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsPositive } from "class-validator"

export class AddItemToOrderRequestMessage {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: '---'})
  readonly orderId: number

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: '---'})
  readonly productId: number

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: '---'})
  readonly quantity: number
}
