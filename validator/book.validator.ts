import { MainValidator } from "./main.validator";
const { BookEntity } = require("../records/Book.record");
const { AuthorEntity } = require("../records/Author.record");
const { PublisherEntity } = require("../records/Publisher.record");

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
  constructor({ title, id, publischedAt, publisherId, authorId }: Props) {
    this.title = title;
    this.id = id;
    this.publischedAt = publischedAt;
    this.publisherId = publisherId;
    this.authorId = authorId;
    this.validator = new MainValidator();
  }

  static async checkForInsertOne(data: PropsInsert) {
    const book = new this(data);

    book.validator.isNotBeEmpty(book.title, "title");
    book.validator.isNotNumber(Number(book.publischedAt), "publischedAt");
    book.validator.isNotBeEmpty(book.publisherId, "publisherId");
    book.validator.isNotBeEmpty(book.authorId, "authorId");

    if (!book.publisherId) book.publisherId = "empty";
    if (!book.authorId) book.authorId = "empty";

    await book.validator.objectMustBeExist(
      AuthorEntity,
      book.authorId,
      "id",
      "Author"
    );
    await book.validator.objectMustBeExist(
      PublisherEntity,
      book.publisherId,
      "id",
      "Publisher"
    );
    return book;
  }

  static async checkForGeteOne(data: PropsGetOne) {
    const book = new this(data);
    book.validator.isNotBeEmpty(book.id, "id");
    await book.validator.objectMustBeExist(BookEntity, book.id, "id", "Book");
    return book;
  }
}
