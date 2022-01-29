import { createConnection } from "typeorm";

import { User } from "./models/user.model";

export async function getDbConnection() {
    const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    const DATABASE_USER = process.env.DATABASE_USER || "";
    const DATABASE_PORT = 27017;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
    const DATABASE_DB = "pub-sub-demo";
    const entities = [
        User
    ];
    const conn = await createConnection({
        type: "mongodb",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: true,
        logging:false
    });
    return conn;

}