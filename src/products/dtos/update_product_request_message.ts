// import { PartialType } from '@nestjs/mapped-types'
import { PartialType } from '@nestjs/swagger'
import { CreateProductRequestMessage } from './create_product_request_message';

export class UpdateProductRequestMessage extends PartialType(CreateProductRequestMessage) {
  // name: string
  // price: number
  // stock: number
}
