import { MainValidator } from "./main.validator";

interface Props {
  name: string;
}

export class PublisherValidator {
  name: string;
  validator: MainValidator;

  constructor({ name }: Props) {
    this.name = name;
    this.validator = new MainValidator();
    this.run();
  }

  run() {
    this.validator.isNotBeEmpty(this.name, "name");
  }
}
