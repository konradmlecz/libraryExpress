import { pool } from "../utils/db";

export class BookAuthorEntity {
  authorId: string;
  bookId: string;
  constructor({ authorId, bookId }: BookAuthorEntity) {
    this.authorId = authorId;
    this.bookId = bookId;
  }
  async insertOne() {
    console.log(this.authorId, "authorId");
    console.log(this.bookId, "bookId");

    await pool.execute(
      "INSERT INTO `book_author`(`authorId`, `bookId`) VALUES (:authorId,:bookId)",
      {
        authorId: this.authorId,
        bookId: this.bookId,
      }
    );
    return;
  }
}
