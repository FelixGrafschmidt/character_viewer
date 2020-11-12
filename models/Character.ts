import { v4 } from "uuid";

export class SubCharacter {
	private _id: string = "";
	private _name: string = "";
	private _origin: string = "";
	private _images: Array<string> = [];
	private _attributeArrays: Map<string, string> = new Map();

	constructor() {
		return this;
	}

	init(id?: string): SubCharacter {
		this._id = id || v4();
		return this;
	}

	fromJSON(json: string): SubCharacter {
		const parsedJSON = JSON.parse(json) as { id: string; name: string; origin: string; images: Array<string>; attributeArrays: Map<string, string> };
		this._id = parsedJSON.id;
		this._name = parsedJSON.name;
		this._origin = parsedJSON.origin;
		this._images = parsedJSON.images;
		this._attributeArrays = parsedJSON.attributeArrays;
		return this;
	}

	toJSON(): string {
		return JSON.stringify({ id: this._id, name: this._name, origin: this._origin, images: this._images, attributeArrays: this._attributeArrays });
	}
}
export class Character {
	private _id: string = "";
	private _name: string = "";
	private _origin: string = "";
	private _images: Array<string> = [];
	private _attributeArrays: Map<string, string> = new Map();
	private _subCharacterArrays: Map<string, Array<SubCharacter>> = new Map();

	constructor() {
		return this;
	}

	init(id?: string): Character {
		this._id = id || v4();
		return this;
	}

	fromJSON(json: string): Character {
		const parsedJSON = JSON.parse(json) as { id: string; name: string; origin: string; images: Array<string>; attributeArrays: Map<string, string>; subCharacterArrays: Map<string, Array<SubCharacter>> };
		this._id = parsedJSON.id;
		this._name = parsedJSON.name;
		this._origin = parsedJSON.origin;
		this._images = parsedJSON.images;
		this._attributeArrays = parsedJSON.attributeArrays;
		this._subCharacterArrays = new Map();
		parsedJSON.subCharacterArrays.forEach((subCharacterArray, type) => {
			const parsedSubCharacterArray: Array<SubCharacter> = [];
			subCharacterArray.forEach((subCharacter) => {
				parsedSubCharacterArray.push(new SubCharacter().fromJSON(JSON.stringify(subCharacter)));
			});

			this._subCharacterArrays.set(type, parsedSubCharacterArray);
		});
		return this;
	}

	toJSON(): string {
		const subCharacterArrays: Map<string, string> = new Map();
		this._subCharacterArrays.forEach((subCharacterArray, type) => {
			subCharacterArray.forEach((subCharacter) => {
				subCharacterArrays.set(type, subCharacter.toJSON());
			});
		});
		return JSON.stringify({ id: this._id, name: this._name, origin: this._origin, images: this._images, attributeArrays: this._attributeArrays, subCharacterArrays });
	}
}
