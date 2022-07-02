import { MainValidator } from "./main.validator";
const { ReaderEntity } = require("../records/Reader.record");

interface Props {
  surname?: string;
  name?: string;
  id?: string;
  email?: string;
  password?: string;
}

interface PropsGetOne {
  id: string;
}

interface PropsInsert {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
}

interface PropsUbdate {
  name: string;
  surname: string;
  phone: string;
  email: string;
  id: string;
}

export class ReaderValidator {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  validator: MainValidator;

  constructor({ name, surname, id, email, password }: Props) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.validator = new MainValidator();
  }

  static async checkLogin(data: PropsInsert) {
    const reader = new this(data);

    reader.validator.isNotBeEmpty(reader.email, "email");
    if (!reader.email) reader.email = "";
    await reader.validator.objectWithEmailMustBeExist(
      ReaderEntity,
      reader.email,
      "email",
      "Reader"
    );
    if (reader.validator.entity) {
      reader.validator.isAuthenticated(reader.password);
    }

    return reader;
  }

  static async checkSignUp(data: PropsInsert) {
    const reader = new this(data);

    reader.validator.isNotBeEmpty(reader.name, "name");
    reader.validator.isNotBeEmpty(reader.surname, "surname");
    reader.validator.isNotBeEmpty(reader.password, "password");
    reader.validator.mailIsNotValid(reader.email);
    if (!reader.email) reader.email = "";
    await reader.validator.objectWithMailMustNotBeExist(
      ReaderEntity,
      reader.email,
      "email",
      "Reader"
    );
    return reader;
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

  static async checkForUbdateOne(data: PropsUbdate) {
    const reader = new this(data);
    reader.validator.isNotBeEmpty(reader.id, "id");
    await reader.validator.objectMustBeExist(
      ReaderEntity,
      reader.id,
      "id",
      "Reader"
    );

    reader.validator.isNotBeEmpty(reader.name, "name");
    reader.validator.isNotBeEmpty(reader.surname, "surname");

    return reader;
  }
}
