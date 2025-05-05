import { registerAs } from "@nestjs/config"

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    passwd: process.env.DATABASE_PASSWD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT ?? ''),
  },
  apiKey: process.env.API_KEY,
  appId: 'AWESOME APP'
}))
