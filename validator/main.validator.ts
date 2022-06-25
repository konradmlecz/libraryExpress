export class MainValidator {
  error: boolean;
  resultValidation: Array<string>;
  constructor() {
    this.error = false;
    this.resultValidation = [];
  }

  isNotBeEmpty(property: string, key: string) {
    if (!property) {
      (this.error = true),
        this.resultValidation.push(`Property ${key} is isNotBeEmpty`);
    }
  }
  async objectMustBeExist(record: any, property: string, key: string) {
    const [obj] = await record.getOne(property);
    if (!obj) {
      (this.error = true),
        this.resultValidation.push(`Object with ${key} ${property} not exist`);
    }
  }
}
