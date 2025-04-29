export class Product {
  id: number
  name: string
  price: number
  stock: number

  constructor(product: Product) {
    this.id = product.id ?? 0
    this.name = product.name ?? ''
    this.price = product.price ?? 0
    this.stock = product.stock ?? 0
  }
}
