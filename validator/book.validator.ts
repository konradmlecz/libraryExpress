import { BookEntity } from "../records/Book.record";
import { MainValidator } from "./main.validator";

interface Props {
  title?: string;
  id?: string;
  publischedAt?: string;
  publisherId?: string;
  authorId?: string;
}

interface PropsInsert {
  title: string;
  publischedAt: string;
  publisherId: string;
  authorId: string;
}

interface PropsGetOne {
  id: string;
}

export class BookValidator {
  id?: string;
  title?: string;
  validator: MainValidator;
  isLend: boolean;
  publischedAt: string;
  publisherId: string;
  authorId: string;
  entity: null | BookEntity;
  constructor({ title, id, publischedAt, publisherId, authorId }: Props) {
    this.title = title;
    this.id = id;
    this.publischedAt = publischedAt;
    this.publisherId = publisherId;
    this.authorId = authorId;
    this.validator = new MainValidator();
    this.entity = null;
  }

  setEnity(entity: null | BookEntity) {
    this.entity = entity;
  }

  static async checkForInsertOne(data: PropsInsert) {
    const book = new this(data);

    book.validator.isNotBeEmpty(book.title, "title");
    book.validator.isNotNumber(Number(book.publischedAt), "publischedAt");
    book.validator.isNotBeEmpty(book.publisherId, "publisherId");
    book.validator.isNotBeEmpty(book.authorId, "authorId");

    if (!book.publisherId) book.publisherId = "empty";
    if (!book.authorId) book.authorId = "empty";

    await book.validator.authorMustBeExist(book.authorId);
    await book.validator.publisherMustBeExist(book.publisherId);
    return book;
  }

  static async checkForGetOne(data: PropsGetOne) {
    const book = new this(data);
    book.validator.isNotBeEmpty(book.id, "id");
    await book.validator.bookMustBeExist(book.id, book.setEnity);
    return book;
  }
}
