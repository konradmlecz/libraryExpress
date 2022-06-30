import { MainValidator } from "./main.validator";
const { ReaderEntity } = require("../records/Reader.record");
const { BookEntity } = require("../records/Book.record");
const { ReaderBookEntity } = require("../records/ReaderBook.record");

interface Props {
  readerId?: string;
  bookId?: string;
  id?: string;
}

interface PropsInsert {
  readerId: string;
  bookId: string;
  id?: string;
}

interface PropsDelete {
  readerId: string;
  bookId: string;
}

interface PropsGetAll {
  readerId: string;
}

export class ReaderBookValidator {
  id?: string;
  readerId: string;
  bookId: string;
  validator: MainValidator;
  constructor({ id, bookId = "", readerId = "" }: Props) {
    this.id = id;
    this.bookId = bookId;
    this.readerId = readerId;
    this.validator = new MainValidator();
  }

  static async checkLendOneBook(data: PropsInsert) {
    const readerBook = new this(data);

    readerBook.validator.isNotBeEmpty(readerBook.readerId, "readerId");
    readerBook.validator.isNotBeEmpty(readerBook.bookId, "bookId");

    await readerBook.validator.objectMustBeExist(
      ReaderEntity,
      readerBook.readerId,
      "id",
      "Reader"
    );

    await readerBook.validator.bookMustBeExist(
      BookEntity,
      readerBook.bookId,
      "id",
      "Book"
    );

    await readerBook.validator.bookNotBeLend(
      ReaderBookEntity,
      readerBook.bookId,
      "bookId",
      "Book"
    );

    await readerBook.validator.readerMustNotHaveTwoLendBook(
      ReaderBookEntity,
      readerBook.readerId,
      "readerId",
      "Reader"
    );

    return readerBook;
  }

  static async checkGetAll(data: PropsGetAll) {
    const readerBook = new this(data);
    readerBook.validator.isNotBeEmpty(readerBook.readerId, "readerId");
    return readerBook;
  }

  static async checkDeleteBook(data: PropsDelete) {
    const readerBook = new this(data);
    readerBook.validator.isNotBeEmpty(readerBook.readerId, "readerId");
    readerBook.validator.isNotBeEmpty(readerBook.bookId, "boookId");
    await readerBook.validator.bookMustBeLendByReader(
      ReaderBookEntity,
      readerBook.bookId,
      readerBook.readerId,
      "BookId",
      "Book"
    );
    return readerBook;
  }
}
