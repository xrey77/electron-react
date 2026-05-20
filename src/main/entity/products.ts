import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, 
  UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './category';


@Entity({ name: 'products' })
export class Product {
  
  @PrimaryGeneratedColumn()
    id!: number;

  @ManyToOne(() => Category, (category) => category.products, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' }) // Creates a categoryId column in products table
    category!: Category | null;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
    descriptions!: string;

  @Column({ type: 'integer', default: 0 })
    qty!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
    unit!: string;

  @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
    })
    costprice!: string; 

  @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
    })
    sellprice!: string; 
  
  @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.00,
    })
    saleprice!: string; 

  @Column({ type: 'varchar', length: 255, nullable: true })
    productpicture!: string;

  @Column({ type: 'integer', default: 0 })
    alertstocks!: number;

  @Column({ type: 'integer', default: 0 })
    criticalstocks!: number;

  // POSTGRESQL @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // MYSQL/MARIADB @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}
