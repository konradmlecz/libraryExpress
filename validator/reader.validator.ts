import { MainValidator } from "./main.validator";
const { ReaderEntity } = require("../records/Reader.record");

interface Props {
  surname?: string;
  name?: string;
  id?: string;
}

interface PropsGetOne {
  id: string;
}

export class ReaderValidator {
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
}
