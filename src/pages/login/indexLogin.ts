import { FormCreator } from "../../utils/formCreator";
import { dataLoginFields } from "./dataLoginFields";
import { HeaderCreator } from "./headerCreator";

new HeaderCreator(["grid", "place-items-center"]);

new FormCreator("main", dataLoginFields);
