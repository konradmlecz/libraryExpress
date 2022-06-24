import { v4 as uuid } from "uuid";
import { pool } from "../utils/db";

export class AuthorEntity {
  id: string;
  name: string;
  surname: string;
  constructor({ id, name, surname }: AuthorEntity) {
    this.id = id ?? uuid();
    this.name = name;
    this.surname = surname;
  }
  async insertOne() {
    await pool.execute(
      "INSERT INTO `author`(`id`,`name`, `surname`) VALUES (:id,:name,:surname)",
      {
        id: this.id,
        name: this.name,
        surname: this.surname,
      }
    );
    return this.id;
  }

  async updateOne() {
    const [result] = await pool.execute(
      "UPDATE `author` SET `name`=:name, `surname`=:surname WHERE `id`=:id",
      {
        name: this.name,
        surname: this.surname,
        id: this.id,
      }
    );
    return result;
  }

  static async getAll() {
    const [authorItems] = await pool.execute("SELECT * FROM `author`");
    return authorItems;
  }

  static async getOne(id: string) {
    const [results] = await pool.execute(
      "SELECT * FROM `author` WHERE `id`=:id",
      {
        id: id,
      }
    );
    return results;
  }
}
