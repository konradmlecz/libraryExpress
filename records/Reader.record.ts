import { v4 as uuid } from "uuid";
import { pool } from "../utils/db";

export class ReaderEntity {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  constructor({ id, name }: ReaderEntity) {
    this.id = id ?? uuid();
    this.name = name;
  }
  async insertOne() {
    await pool.execute(
      "INSERT INTO `reader`(`id`,`name`, `surname`,`email`,`phone`) VALUES (:id,:name,:surname,:email,:phone)",
      {
        id: this.id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
      }
    );
    return this.id;
  }

  static async getOne(id: string) {
    const [results] = await pool.execute(
      "SELECT * FROM `reader` WHERE `id`=:id",
      {
        id: id,
      }
    );
    return results;
  }
}
