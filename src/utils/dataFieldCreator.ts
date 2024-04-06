export class DataFieldCreator {
  name: string;
  label: string;
  required: boolean;
  pattern: string;
  type: string;
  constructor(
    name: string,
    label: string,
    required: boolean,
    pattern: string,
    type: string
  ) {
    this.name = name;
    this.label = label;
    this.required = required;
    this.pattern = pattern;
    this.type = type;
  }
}
