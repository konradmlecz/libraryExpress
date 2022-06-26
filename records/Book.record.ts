import { v4 as uuid } from "uuid";
import { pool } from "../utils/db";

export class BookEntity {
  id: string;
  title: string;
  description: string;
  publischedAt: string;
  publisherId: string;
  isLend: boolean;
  constructor({
    id,
    title,
    description,
    publischedAt,
    publisherId,
    isLend,
  }: BookEntity) {
    this.id = id ?? uuid();
    this.title = title;
    this.description = description;
    this.publischedAt = publischedAt;
    this.publisherId = publisherId;
    this.isLend = isLend;
  }
  async insertOne() {
    await pool.execute(
      "INSERT INTO `book`(`id`,`title`, `description`, `publischedAt`, `publisherId`, `isLend`) VALUES (:id,:title,:description,:publischedAt ,:publisherId ,:isLend )",
      {
        id: this.id,
        title: this.title,
        description: this.description,
        publischedAt: this.publischedAt,
        publisherId: this.publisherId,
        isLend: this.isLend,
      }
    );
    return this.id;
  }

  static async getAll() {
    const [bookItems] = await pool.execute(
      "SELECT `book`.`id`, `book`.`title`, `book`.`description`,`book`.`publischedAt`, `book`.`isLend`, `publisher`.`name` AS publisherName, `author`.`name` AS authorName, `author`.`surname` AS authorSurname FROM `book` JOIN `publisher` ON `book`.`publisherId` = `publisher`.`id` JOIN `book_author` ON `book`.`id` = `book_author`.`bookId` JOIN `author` ON `book_author`.`authorId` = `author`.`id`"
    );
    return bookItems;
  }

  static async getOne(id: string) {
    const [results] = await pool.execute(
      "SELECT * FROM `book` WHERE `id`=:id",
      {
        id: id,
      }
    );
    return results;
  }
}
