import { TypeObjectString } from "../sharedTypes/typeObjectString";

export class HelpersForm {
  static getFormValues(e: Event) {
    const elementId = (e.currentTarget as HTMLFormElement)?.id;
    const formEl = document.getElementById(elementId) as HTMLFormElement;
    const formData = formEl && new FormData(formEl);

    const formValues: TypeObjectString = {};

    if (formData) {
      for (const [key, value] of formData.entries()) {
        formValues[key] = (value as string).trim();
      }
    }

    return formValues;
  }

  static debounce(func: (...args: Event[]) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;

    const timeoutFunction = (...args: Event[]) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
    return timeoutFunction;
  }
}
