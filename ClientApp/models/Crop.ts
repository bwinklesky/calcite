import { Base } from "./Base.js";

export class Crop extends Base {
    cropId?: number;
    varietyId?: number;
    variety?: Object = new Object();
    startDate: Date = new Date();  
    harvestDate: Date = new Date();
    quantity?: number;
    growId?: number;
}