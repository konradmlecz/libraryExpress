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
}
