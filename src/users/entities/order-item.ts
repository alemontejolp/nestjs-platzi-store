// import { Product } from "src/products/entities/product"
import { Product } from "../../products/entities/product"
import { Order } from "./order"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(() => Product)
  product?: Product

  @ManyToOne(() => Order, (order) => order.items)
  order?: Order

  @Column({type: 'int'})
  quantity?: number

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt?: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt?: Date
}
