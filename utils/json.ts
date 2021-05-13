import { newCharacterImage } from "~/models/interfaces/Character";

function fixImportListJSON(this: any, key: string, value: any) {
	if (key === "imageUrl") {
		this.images = [];
		this.images.push(newCharacterImage(value, true));
		return;
	}
	if (key === "partners") {
		return;
	}
	if (key === "variants") {
		return;
	}
	return value;
}

export { fixImportListJSON };
