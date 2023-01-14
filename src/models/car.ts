import { ObjectId } from "mongodb";

export default class Car {
    constructor(public _id?: ObjectId, public brand: string, public name: string, public production_year: number, public price: number) {}
}
