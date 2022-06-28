import { MainValidator } from "./main.validator";
const { ReaderEntity } = require("../records/Reader.record");

interface Props {
  surname?: string;
  name?: string;
  id?: string;
  email?: string;
}

interface PropsGetOne {
  id: string;
}

interface PropsInsert {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export class ReaderValidator {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  validator: MainValidator;

  constructor({ name, surname, id, email }: Props) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.validator = new MainValidator();
  }

  static async checkForGeteOne(data: PropsGetOne) {
    const reader = new this(data);
    reader.validator.isNotBeEmpty(reader.id, "id");
    await reader.validator.objectMustBeExist(
      ReaderEntity,
      reader.id,
      "id",
      "Reader"
    );
    return reader;
  }

  static async checkForInsertOne(data: PropsInsert) {
    const reader = new this(data);

    reader.validator.isNotBeEmpty(reader.name, "name");
    reader.validator.isNotBeEmpty(reader.surname, "surname");
    reader.validator.mailIsNotValid(reader.email);
    await reader.validator.objectMustNotBeExist(
      ReaderEntity,
      reader.email,
      "email",
      "Reader"
    );
    console.log(reader);

    return reader;
  }
}
