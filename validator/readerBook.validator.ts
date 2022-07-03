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

  async bookNotBeLend() {
    const [obj] = await ReaderBookEntity.getOne(this.bookId);
    if (obj.length) {
      this.validator.addError("Book with id is lend");
    }
  }

  async readerMustNotHaveTwoLendBook() {
    const [obj] = await ReaderBookEntity.count(this.readerId);
    if (obj["COUNT (*)"] >= 2) {
      this.validator.addError("Reader have not lend more than 2 book");
    }
  }

  async bookMustBeLendByReader() {
    const [obj] = await ReaderBookEntity.getOneLend(this.bookId, this.readerId);

    if (!obj.length) {
      this.validator.addError(`Book is not be lend by Reader`);
    }
  }

  static async checkLendOneBook(data: PropsInsert) {
    const readerBook = new this(data);

    readerBook.validator.isNotBeEmpty(readerBook.readerId, "readerId");
    readerBook.validator.isNotBeEmpty(readerBook.bookId, "bookId");

    await readerBook.validator.readerMustBeExist(readerBook.readerId);

    await readerBook.validator.bookMustBeExist(readerBook.bookId);

    await readerBook.bookNotBeLend();

    await readerBook.readerMustNotHaveTwoLendBook();

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
    await readerBook.bookMustBeLendByReader();
    return readerBook;
  }
}
