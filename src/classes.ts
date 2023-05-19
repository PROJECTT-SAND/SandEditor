export class Object {
  name: string;
  type: OBJECT_TYPE;
    isHidden: boolean;
    parentUUID: string | null;
    UUID: string;

    constructor(name, type, isHidden, parentUUID) {
      this.UUID = uuidv4();
      this.name = name;
      this.type = type;
      this.isHidden = isHidden;
      this.parentUUID = parentUUID;
    }
  }