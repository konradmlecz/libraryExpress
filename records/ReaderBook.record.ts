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
