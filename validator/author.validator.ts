import { AuthorEntity } from "../records/Author.record";
import { MainValidator } from "./main.validator";

interface Props {
  surname?: string;
  name?: string;
  id?: string;
}

interface PropsInsert {
  name: string;
  surname: string;
}

interface PropsGetOne {
  id: string;
}

interface PropsUbdate {
  surname: string;
  name: string;
  id: string;
}

export class AuthorValidator {
  id?: string;
  name?: string;
  surname?: string;
  validator: MainValidator;
  entity: null | AuthorEntity;

  constructor({ name, surname, id }: Props) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.entity = null;
    this.validator = new MainValidator();
  }

  setEntity(entity: null | AuthorEntity) {
    this.entity = entity;
  }

  static checkForInsertOne(data: PropsInsert) {
    const author = new this(data);

    author.validator.isNotBeEmpty(author.name, "name");
    author.validator.isNotBeEmpty(author.surname, "surname");

    return author;
  }

  static async checkForUbdateOne(data: PropsUbdate) {
    const author = new this(data);
    author.validator.isNotBeEmpty(author.id, "id");
    await author.validator.authorMustBeExist(author.id, author);

    author.validator.isNotBeEmpty(author.name, "name");
    author.validator.isNotBeEmpty(author.surname, "surname");

    return author;
  }

  static async checkForGeteOne(data: PropsGetOne) {
    const author = new this(data);
    author.validator.isNotBeEmpty(author.id, "id");
    await author.validator.authorMustBeExist(author.id, author);
    return author;
  }
}
