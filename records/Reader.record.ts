import { v4 as uuid } from "uuid";
import { pool } from "../utils/db";

export class ReaderEntity {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  constructor({
    id,
    name,
    surname,
    email,
    password,
    phone = null,
  }: ReaderEntity) {
    this.id = id ?? uuid();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
  async insertOne() {
    await pool.execute(
      "INSERT INTO `reader`(`id`,`name`, `surname`,`email`,`phone`,`password`) VALUES (:id,:name,:surname,:email,:phone, :password)",
      {
        id: this.id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        password: this.password,
      }
    );
    return this.id;
  }

  static async getOneById(id: string) {
    const [results] = await pool.execute(
      "SELECT * FROM `reader` WHERE `id`=:id",
      {
        id: id,
      }
    );
    return results;
  }

  static async getOneByEmail(email: string) {
    const [results] = await pool.execute(
      "SELECT * FROM `reader` WHERE `email`=:email",
      {
        email: email,
      }
    );
    return results;
  }

  static async checkIsUserWithEmail(email: string) {
    const [results] = await pool.execute(
      "SELECT * FROM `reader` WHERE `email`=:email",
      {
        email: email,
      }
    );
    return results;
  }

  async updateOne() {
    const [result] = await pool.execute(
      "UPDATE `reader` SET `name`=:name, `surname`=:surname, `phone`=:phone WHERE `id`=:id",
      {
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        id: this.id,
      }
    );
    return result;
  }
}
