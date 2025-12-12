export interface IBase {
    id?: string;
    dateCreated?: Date;
}

export class Base {
    id: string = kendo.guid();
    dateCreated?: Date;
}