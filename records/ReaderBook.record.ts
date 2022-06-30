import { pool } from "../utils/db";

export class ReaderBookEntity {
  readerId: string;
  bookId: string;
  constructor({ readerId, bookId }: ReaderBookEntity) {
    this.readerId = readerId;
    this.bookId = bookId;
  }
  async insertOne() {
    await pool.execute(
      "INSERT INTO `book_reader`(`readerId`, `bookId`) VALUES (:readerId,:bookId)",
      {
        readerId: this.readerId,
        bookId: this.bookId,
      }
    );
    return;
  }

  static async count(id: string) {
    const [bookItems] = await pool.execute(
      "SELECT COUNT (*) FROM `book_reader` WHERE `readerId`=:id",
      {
        id: id,
      }
    );
    return bookItems;
  }

  static async getOne(bookId: string) {
    const results = await pool.execute(
      "SELECT * FROM `book_reader` WHERE `bookId`=:bookId ",
      {
        bookId: bookId,
      }
    );
    return results;
  }

  static async getOneLend(bookId: string, readerId: string) {
    const results = await pool.execute(
      "SELECT * FROM `book_reader` WHERE `bookId`=:bookId AND `readerId`=:readerId",
      {
        bookId: bookId,
        readerId: readerId,
      }
    );
    return results;
  }

  static async deleteOne(bookId: string, readerId: string) {
    const results = await pool.execute(
      "DELETE FROM `book_reader` WHERE `bookId`=:bookId AND `readerId`=:readerId ",
      {
        bookId: bookId,
        readerId: readerId,
      }
    );
    return results;
  }

  static async getAll(readerId: string) {
    const results = await pool.execute(
      "SELECT * FROM `book_reader` JOIN `book` ON `book_reader`.`bookId` = `book`.`id` WHERE `readerId`=:readerId ",
      {
        readerId: readerId,
      }
    );
    return results;
  }
}
