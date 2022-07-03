import { ReaderEntity } from "../records/Reader.record";
import { MainValidator } from "./main.validator";
const bcrypt = require("bcryptjs");

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
  entity: null | ReaderEntity;

  constructor({ name, surname, id, email, password }: Props) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.validator = new MainValidator();
    this.entity = null;
  }

  setEnity(entity: null | ReaderEntity) {
    this.entity = entity;
  }

  // async mustBeExist() {
  //   const [obj]: any = await ReaderEntity.getOneById(this.id);

  //   if (!obj) {
  //     this.validator.addError(`Reader with ${this.id} not exist`);
  //   }
  //   if (obj) {
  //     this.entity = obj;
  //   }
  // }

  async withEmailMustBeExist() {
    const [obj]: any = await ReaderEntity.getOneByEmail(this.email);
    if (!obj) {
      this.validator.addError("Reader with email not exist");
    }
    if (obj) {
      this.entity = obj;
    }
  }

  async withMailMustNotBeExist() {
    const [obj]: any = await ReaderEntity.getOneByEmail(this.email);
    if (obj) {
      this.validator.addError(`Reader with email exist`);
    }
  }

  isAuthenticated() {
    let passwordIsCorrect = false;
    if (this.entity.password || this.password) {
      passwordIsCorrect = bcrypt.compareSync(
        this.password,
        this.entity.password
      );
    }
    if (!passwordIsCorrect) {
      this.validator.addError(`Password is not correct`);
    }
  }

  static async checkLogin(data: PropsInsert) {
    const reader = new this(data);

    reader.validator.isNotBeEmpty(reader.email, "email");
    if (!reader.email) reader.email = "";
    await reader.withEmailMustBeExist();
    if (reader.entity) {
      reader.isAuthenticated();
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
    await reader.withMailMustNotBeExist();
    return reader;
  }

  static async checkForGeteOne(data: PropsGetOne) {
    const reader = new this(data);
    reader.validator.isNotBeEmpty(reader.id, "id");
    await reader.validator.readerMustBeExist(reader.id, reader.setEnity);
    return reader;
  }

  static async checkForUbdateOne(data: PropsUbdate) {
    const reader = new this(data);
    reader.validator.isNotBeEmpty(reader.id, "id");
    await reader.validator.readerMustBeExist(reader.id, reader.setEnity);

    reader.validator.isNotBeEmpty(reader.name, "name");
    reader.validator.isNotBeEmpty(reader.surname, "surname");

    return reader;
  }
}
