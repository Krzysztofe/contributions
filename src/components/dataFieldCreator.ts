export class DataFieldCreator {
  constructor(
    public name: string,
    public label: string,
    public regEx: string,
    public type: string,
    public placeholder: string,
    public errorMsg: string
  ) {}
}
