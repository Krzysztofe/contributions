export class DataFieldCreator {
  static createDataField(
    name: string,
    label: string,
    required: boolean,
    pattern: string,
    type: string,
    placeholder: string,
    errorMsg: string
  ) {
    return {
      name,
      label,
      required,
      pattern,
      type,
      placeholder,
      errorMsg,
    };
  }
}
