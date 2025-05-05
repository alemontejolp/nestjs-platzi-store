import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Product } from "./product"

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'varchar', length: 255 })
  name?: string

  @Column({ type: 'varchar', length: 255 })
  imageSrc?: string

  @OneToMany(() => Product, (product) => product.brand)
  products?: Product[]

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
