import { ValidationLogin, FormSubmit } from "./index.ts";
import { createFields } from "../utils/formFields.ts";
import { createBtn } from "./btnLogin.ts";
import "./style.css";

const fields = [
//   {
//     name: "name",
//     label: "Imię",
//     required: true,
//     pattern: "^[a-zA-Z –-]+$",
//   },
  {
    name: "password",
    label: "Hasło",
    required: true,
    pattern: "^[a-zA-Z –-]+$",
    type: "password",
  },
];

// const validation = new ValidationLogin({
//   inputPasswordElem: document.getElementById("password"),
//   errorElem: document.getElementById("error"),
// });



export const createForm = () => {
  const mainEl = document.querySelector("main");

  const formEl = document.createElement("form");
  formEl.id = "form";
  formEl.classList.add("flex", "flex-col", "bg-slate-50", "p-5");
  formEl.setAttribute("novalidate", "");
  mainEl?.append(formEl);
  formEl.append(createFields(fields));
  formEl.append(createBtn("Zaloguj się"));

  const [form, inputPasswordElem, btn, errorElem] = [
    "form",
    "password",
    "submit",
    "error",
  ].map((item) => document.getElementById(item));

  console.log("", inputPasswordElem);

  const validation = new ValidationLogin({ inputPasswordElem, errorElem });

  const formSubmition = new FormSubmit({ formEl }, validation);

  formEl.addEventListener("submit", formSubmition.handleLogin);
};

createForm();
