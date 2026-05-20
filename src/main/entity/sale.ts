import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'sales' })
export class Sale {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })    
  salesamount!: string; 

   @CreateDateColumn()
   salesdate!: Date;  
}
