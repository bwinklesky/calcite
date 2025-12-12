import { Base } from "./Base.js";
import { WKObject } from "./WKObject.js";

export class Field extends Base {
    fieldId?: number;
    farmId?: number;
    boundary?: WKObject;
}