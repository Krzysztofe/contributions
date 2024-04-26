export const getFormValues = (e: SubmitEvent) => {
  const elementId = (e.currentTarget as HTMLFormElement)?.id;
  const formEl = document.getElementById(elementId) as HTMLFormElement;
  const formData = formEl && new FormData(formEl);

  const formValues: Record<string, string> = {};

  if (formData) {
    for (const [key, value] of formData.entries()) {
      formValues[key] = (value as string).trim();
    }
  }

  return formValues;
};


