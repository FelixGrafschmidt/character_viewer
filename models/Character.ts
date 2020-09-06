export class Character {
	name: string;
	imageUrl?: string;
	subCharacters: Map<string, Array<SubCharacter>>;
	images: Array<string>;
	variants: Array<SubCharacter>;
	partners: Array<SubCharacter>;
	origin?: string;

	detailsOpened: boolean;
	editing: boolean;

	newVariants?: Array<SubCharacter>;
	newPartners?: Array<SubCharacter>;
	newName?: string;
	newOrigin?: string;
	newImageUrl?: string;

	constructor() {
		this.name = "";
		this.detailsOpened = false;
		this.editing = false;
		this.variants = [];
		this.partners = [];
		this.subCharacters = new Map();
		this.images = [];
	}
}

export class SubCharacter {
	name: string;
	imageUrl?: string;
	newName?: string;
	newImageUrl?: string;
	constructor() {
		this.name = "";
	}
}
