import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Order } from "./order";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'varchar', length: 255 })
  phone?: string

  @OneToOne(() => User, (user: User) => user.customer, { nullable: true })
  user?: User

  @OneToMany(() => Order, (order) => order.customer)
  orders?: Order[]

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
