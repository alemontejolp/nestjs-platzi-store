import { DataSource } from "typeorm"

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT ?? ''),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWD,
  database: process.env.DATABASE_NAME,
  entities: [
    'src/**/entities/*.ts'
  ],
  migrations: [
    'src/database/migrations/*.ts'
  ],
})
