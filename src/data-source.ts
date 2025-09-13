import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{ts,js}"
  );
  const seedsPath: string = path.join(__dirname, "./seed/**.{ts,js}");
  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL does not exists");
  }

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [migrationsPath, seedsPath],
    entities: [entitiesPath]
  };
};

const AppDataSource = new DataSource(dataSourceConfig());
//npm run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/data-source.ts
//npm run typeorm migration:run -- -d ./src/data-source
//to vercel yarn build

export { AppDataSource };
