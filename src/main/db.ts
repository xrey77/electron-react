// src/db.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Role }  from './entity/role'
import { User } from "./entity/user";
import { Category } from "./entity/category";
import { Product } from './entity/products';
import { Sale } from "./entity/sale";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "rey",
    password: "rey",
    database: "electron_db",
    synchronize: true, // Use false in production
    logging: false,
    entities: [Role, User, Category, Product, Sale],
    migrations: [],
    subscribers: [],
});

