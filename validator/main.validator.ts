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
}
