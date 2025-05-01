import { Product } from "src/products/entities/product"
import { User } from "./user"

export class Order {
  constructor(order: Order) {
    this.date = order.date
    this.user = order.user
    this.products = order.products
  }

  date: Date
  user: User
  products: Product[]
}
