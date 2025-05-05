import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Product } from "./product"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'varchar', length: 255 })
  name?: string

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: 'product_categories', // Nombre de la tabla
    joinColumn: {
      name: 'category_id' // Nombre del atributo que referencia a la tabla donde estoy
    },
    inverseJoinColumn: {
      name: 'product_id' // Nombre del atributo de la otra tabla
    }
  })
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
