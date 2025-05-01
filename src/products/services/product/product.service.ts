import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product';

@Injectable()
export class ProductService {
  private products: Product[] = [{
    id: 1,
    name: 'Macbook Pro M4',
    price: 50000,
    stock: 13
  }]
  private lastIdx: number = 1

  private create(product: Product): Product {
    product.id = ++this.lastIdx
    this.products.push(product)
    return product
  }

  findOne(id: number): Product|undefined {
    return this.products.find(v => v.id == id)
  }

  findAll(): Product[] {
    return this.products
  }

  save(product: Product): Product {
    if (!product.id) {
      return this.create(product)
    }
    let idx = this.products.findIndex(v => v.id == product.id)
    if (idx == -1) {
      return this.create(product)
    }
    this.products[idx] = product
    return product
  }

  remove(id: number): Product|undefined {
    let idx = this.products.findIndex(v => v.id == id)
    if (idx == -1) return
    let [product] = this.products.splice(idx, 1)
    return product
  }
}
