export class DataFieldCreator {
  constructor(
    public name: string | null = null,
    public label: string | null = null,
    public pattern: string | null = null,
    public type: string | null = null,
    public placeholder: string | null = null,
    public errorMsg: string | null = null
  ) {}
}
