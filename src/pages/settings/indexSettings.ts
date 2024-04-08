import { FormCreator } from "../../utils/formCreator";
import { dataMemberFields } from "./dataMemberFields";
import { HeaderLogedIn } from "../login/headerCreator";

new HeaderLogedIn(["flex", "items-center", "justify-between"]);

new FormCreator("mainSettings", dataMemberFields);
