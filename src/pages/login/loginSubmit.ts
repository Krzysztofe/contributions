export class FormSubmit {
  validation: any;

  constructor(validation: any) {
    this.validation = validation;
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.validation.validate();
    if (this.validation.errors.length > 0) return;
  }
}
