import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { User } from "./user"
import { OrderItem } from "./order-item"
import { Customer } from "./customer"

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer?: Customer

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[]

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
