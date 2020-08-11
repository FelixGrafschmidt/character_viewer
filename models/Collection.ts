import { List } from "./List";

export class Collection extends Array<List> {
	constructor(id: string) {
		super();
		this._id = id;
	}

	private _id: string;

	public get id(): string {
		return this._id;
	}

	public set id(id: string) {
		this._id = id;
	}
}
