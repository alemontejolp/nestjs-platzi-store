import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, Index, JoinColumn } from "typeorm"
import { Brand } from "./brand"
import { Category } from "./category"

@Entity({
  name: 'products'
})
// @Index(['price', 'stock']) // Para indexación conjunta
export class Product {
  @PrimaryGeneratedColumn()
  id: number|undefined

  @Column({ type: 'varchar', length: 255 })
  name: string|undefined

  @Column({ type: 'decimal' })
  @Index() // Para indexar un único atributo
  price: number|undefined

  @Column({ type: 'int8' })
  stock: number|undefined

  @Column({ type: 'varchar', length: 1000, nullable: true })
  imgUrl: string|undefined

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand?: Brand

  @ManyToMany(() => Category, (category) => category.products)
  categories?: Category[]

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt?: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt?: Date

  constructor(product: Product|undefined = undefined) {
    if(!product) return
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.stock = product.stock
    this.imgUrl = product.imgUrl
  }
}
