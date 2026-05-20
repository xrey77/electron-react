import { DataSource } from "typeorm";
import { User } from './entity/user';
import { Role } from "./entity/role";
import { Product } from "./entity/products";
import { Category } from "./entity/category";
import { Sale } from "./entity/sale";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "rey",
  password: "rey",
  database: "electron_db",
  synchronize: true, // Use with caution in production
  logging: true,
  entities: [User, Role, Product, Category, Sale],
  migrations: [],
  subscribers: [],
});