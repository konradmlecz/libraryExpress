import { v4 as uuid } from "uuid";
import { pool } from "../utils/db";

export class PublisherEntity {
  id: string;
  name: string;
  constructor({ id, name }: PublisherEntity) {
    this.id = id ?? uuid();
    this.name = name;
  }
  async insertOne() {
    await pool.execute(
      "INSERT INTO `publisher`(`id`,`name`) VALUES (:id,:name)",
      {
        id: this.id,
        name: this.name,
      }
    );
    return this.id;
  }

  async updateOne() {
    const [result] = await pool.execute(
      "UPDATE `publisher` SET `name`=:name WHERE `id`=:id",
      {
        name: this.name,
        id: this.id,
      }
    );
    return result;
  }

  static async getAll() {
    const [publisherItems] = await pool.execute("SELECT * FROM `publisher`");
    return publisherItems;
  }

  static async getOneById(id: string) {
    const [results] = await pool.execute(
      "SELECT * FROM `publisher` WHERE `id`=:id",
      {
        id: id,
      }
    );
    return results;
  }
}
