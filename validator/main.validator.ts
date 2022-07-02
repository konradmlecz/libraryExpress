import { ReaderEntity } from "../records/Reader.record";

const validator = require("email-validator");
const bcrypt = require("bcryptjs");

export class MainValidator {
  error: boolean;
  resultValidation: Array<string>;
  entity: null | ReaderEntity;
  constructor() {
    this.error = false;
    this.resultValidation = [];
    this.entity = null;
  }

  isNotBeEmpty(property: string, key: string) {
    if (!property) {
      this.error = true;
      this.resultValidation.push(`Property ${key} is Not Be Empty`);
    }
  }

  isNotNumber(property: number, key: string) {
    if (isNaN(property) || property === 0) {
      this.error = true;
      this.resultValidation.push(`Property ${key} is not Number`);
    }
  }

  mailIsNotValid(property: string) {
    if (!validator.validate(property)) {
      this.error = true;
      this.resultValidation.push(`Mail ${property} is not valid`);
    }
  }

  async objectMustBeExist(
    record: any,
    property: string,
    key: string,
    type: string
  ) {
    const [obj] = await record.getOneById(property);
    if (!obj) {
      this.error = true;
      this.resultValidation.push(`${type} with ${key} ${property} not exist`);
    }
    if (obj) {
      this.entity = obj;
    }
  }

  async objectWithEmailMustBeExist(
    record: any,
    property: string,
    key: string,
    type: string
  ) {
    const [obj] = await record.getOneByEmail(property);
    if (!obj) {
      this.error = true;
      this.resultValidation.push(`${type} with ${key} ${property} not exist`);
    }
    if (obj) {
      this.entity = obj;
    }
  }

  isAuthenticated(password: string) {
    let passwordIsCorrect = false;
    if (this.entity.password || password) {
      passwordIsCorrect = bcrypt.compareSync(password, this.entity.password);
    }
    if (!passwordIsCorrect) {
      this.error = true;
      this.resultValidation.push(`Password is not correct`);
    }
  }

  async objectWithMailMustNotBeExist(
    record: any,
    property: string,
    key: string,
    type: string
  ) {
    const [obj] = await record.checkIsUserWithEmail(property);

    if (obj) {
      this.error = true;
      this.resultValidation.push(`${type} with ${key} ${property} exist`);
    }
  }

  async bookMustBeExist(
    record: any,
    property: string,
    key: string,
    type: string
  ) {
    const [obj] = await record.getOne(property);

    if (!obj) {
      this.error = true;
      this.resultValidation.push(`${type} with ${key} ${property} not exist`);
    }
  }

  async bookNotBeLend(
    record: any,
    property: string,
    key: string,
    type: string
  ) {
    const [obj] = await record.getOne(property);
    if (obj.length) {
      this.error = true;
      this.resultValidation.push(`${type} with ${key} ${property} is Lend`);
    }
  }

  async bookMustBeLendByReader(
    record: any,
    propertyOne: string,
    propertyTwo: string,
    key: string,
    type: string
  ) {
    const [obj] = await record.getOneLend(propertyOne, propertyTwo);

    if (!obj.length) {
      this.error = true;
      this.resultValidation.push(
        `${type} with ${key} ${propertyOne} is no be lend by Reader`
      );
    }
  }

  async readerMustNotHaveTwoLendBook(
    record: any,
    property: string,
    key: string,
    type: string
  ) {
    const [obj] = await record.count(property);
    if (obj["COUNT (*)"] >= 2) {
      this.error = true;
      this.resultValidation.push(
        `${type} with ${key} ${property} have not lend more than 2 book`
      );
    }
  }
}
