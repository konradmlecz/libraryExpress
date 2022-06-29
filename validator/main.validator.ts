const validator = require("email-validator");

export class MainValidator {
  error: boolean;
  resultValidation: Array<string>;
  constructor() {
    this.error = false;
    this.resultValidation = [];
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
    const [obj] = await record.getOne(property);
    if (!obj) {
      this.error = true;
      this.resultValidation.push(`${type} with ${key} ${property} not exist`);
    }
  }
  async objectMustNotBeExist(
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

  async bookMustBeExistAndNotBeLend(
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
    if (obj && Boolean(obj.isLend)) {
      this.error = true;
      this.resultValidation.push(`${type} with ${key} ${property} is Lend`);
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
