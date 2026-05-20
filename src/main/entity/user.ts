import { Entity, PrimaryGeneratedColumn, Column, 
  CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role'; 

@Entity({ name: 'users' })
export class User {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })  
  firstname!: string;

  @Column({ type: "varchar", length: 255 })  
  lastname!: string;

  @Column({ type: "varchar", length: 255, unique: true })  
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })  
  mobile!: string;

  @Column({ 
    type: "varchar",
    length: 255, 
    unique: true, 
    charset: 'utf8mb4', 
    collation: 'utf8mb4_bin' 
  }) 
  username!: string;

  @Column({ type: "varchar", length: 255 })  
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: true }) 
  userpic!: string;

  @Column({ type: "varchar", length: 255, nullable: true })  
  secret!: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
  })
  roles!: Role[];

  @Column({ type: 'text', nullable: true })
  qrcodeurl!: string | null;

  @Column({ type: Boolean, default: true })
  isactivated!: boolean;

  @Column({ type: Boolean, default: true })
  isblocked!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
