import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Customer } from "./customer"
import { Exclude } from "class-transformer"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'varchar', length: 255 })
  name?: string

  @Column({ type: 'varchar', length: 255 })
  email?: string

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  passwd?: string

  @Column({ type: 'varchar', length: 255 })
  role?: string

  @OneToOne(() => Customer, (customer: Customer) => customer.user, { nullable: true })
  @JoinColumn({
    name: 'customer_id',
  })
  customer?: Customer

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
