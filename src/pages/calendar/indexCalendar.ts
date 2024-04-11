import { LoadigPageCreator } from "../../components/loadingPageCreator";
import { HeaderLogedIn } from "../login/headerCreator/headerCreator";

new LoadigPageCreator();
new HeaderLogedIn(["flex", "items-center", "justify-between", "fixed"]);
