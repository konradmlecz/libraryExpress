import { MainValidator } from "./main.validator";
const { PublisherEntity } = require("../records/Publisher.record");
interface Props {
  name?: string;
  id?: string;
}

interface PropsInsert {
  name: string;
}

interface PropsGetOne {
  id: string;
}

interface PropsUbdate {
  name: string;
  id: string;
}

export class PublisherValidator {
  name?: string;
  id?: string;
  validator: MainValidator;
  entity: null | typeof PublisherEntity;

  constructor({ name, id }: Props) {
    this.name = name;
    this.id = id;
    this.validator = new MainValidator();
    this.entity = null;
  }

  setEntity(entity: null | typeof PublisherEntity) {
    this.entity = entity;
  }

  static checkForInsertOne(data: PropsInsert) {
    const publisher = new this(data);

    publisher.validator.isNotBeEmpty(publisher.name, "name");

    return publisher;
  }

  static async checkForUbdateOne(data: PropsUbdate) {
    const publisher = new this(data);
    publisher.validator.isNotBeEmpty(publisher.id, "id");
    await publisher.validator.publisherMustBeExist(publisher.id, publisher);
    publisher.validator.isNotBeEmpty(publisher.name, "name");

    return publisher;
  }

  static async checkForGeteOne(data: PropsGetOne) {
    const publisher = new this(data);
    publisher.validator.isNotBeEmpty(publisher.id, "id");
    await publisher.validator.publisherMustBeExist(publisher.id, publisher);
    return publisher;
  }
}
