import { ReaderEntity } from "../records/Reader.record";
import { AuthorEntity } from "../records/Author.record";
import { BookEntity } from "../records/Book.record";
import { PublisherEntity } from "../records/Publisher.record";

const validator = require("email-validator");

export class MainValidator {
  error: boolean;
  resultValidation: Array<string>;
  constructor() {
    this.error = false;
    this.resultValidation = [];
  }

  addError(err: string) {
    this.error = true;
    this.resultValidation.push(err);
  }

  isNotBeEmpty(property: string, key: string) {
    if (!property) {
      this.addError(`Property ${key} is Not Be Empty`);
    }
  }

  isNotNumber(property: number, key: string) {
    if (isNaN(property) || property === 0) {
      this.addError(`Property ${key} is not Number`);
    }
  }

  mailIsNotValid(property: string) {
    if (!validator.validate(property)) {
      this.addError(`Mail ${property} is not valid`);
    }
  }

  async publisherMustBeExist(
    id: string,
    setEnity?: (entity: null | PublisherEntity) => void
  ) {
    const [obj]: any = await PublisherEntity.getOneById(id);

    if (!obj) {
      this.addError(`Publisher with ${id} not exist`);
    }
    if (obj && setEnity) {
      setEnity(obj);
    }
  }

  async authorMustBeExist(
    id: string,
    setEnity?: (entity: null | AuthorEntity) => void
  ) {
    const [obj]: any = await AuthorEntity.getOneById(id);

    if (!obj) {
      this.addError(`Author with ${id} not exist`);
    }
    if (obj && setEnity) {
      setEnity(obj);
    }
  }

  async bookMustBeExist(
    id: string,
    setEnity?: (entity: null | BookEntity) => void
  ) {
    const [obj]: any = await BookEntity.getOneById(id);

    if (!obj) {
      this.addError(`Boook with ${id} not exist`);
    }
    if (obj && setEnity) {
      setEnity(obj);
    }
  }

  async readerMustBeExist(
    id: string,
    setEnity?: (entity: null | ReaderEntity) => void
  ) {
    const [obj]: any = await ReaderEntity.getOneById(id);

    if (!obj) {
      this.addError(`Reader with ${id} not exist`);
    }
    if (obj && setEnity) {
      setEnity(obj);
    }
  }
}
