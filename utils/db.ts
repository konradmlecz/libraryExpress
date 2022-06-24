import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  database: "library_express",
  namedPlaceholders: true,
  decimalNumbers: true,
});
