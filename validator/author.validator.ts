import { MainValidator } from "./main.validator";
const { AuthorEntity } = require("../records/Author.record");

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

  constructor({ name, surname, id }: Props) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.validator = new MainValidator();
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
    await author.validator.objectMustBeExist(AuthorEntity, author.id, "id");

    author.validator.isNotBeEmpty(author.name, "name");
    author.validator.isNotBeEmpty(author.surname, "surname");

    return author;
  }

  static async checkForGeteOne(data: PropsGetOne) {
    const publisher = new this(data);
    publisher.validator.isNotBeEmpty(publisher.id, "id");
    await publisher.validator.objectMustBeExist(
      AuthorEntity,
      publisher.id,
      "id"
    );
    return publisher;
  }
}
