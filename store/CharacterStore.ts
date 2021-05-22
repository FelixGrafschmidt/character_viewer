import { createModule, mutation } from "vuex-class-component";
import { Character, CharacterImage, newCharacter, newCharacterImage } from "~/models/interfaces/Character";

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
});

export class CharacterStore extends VuexModule.With({}) {
	// State
	character = newCharacter("");

	// Mutations
	@mutation setCharacter(character: Character) {
		character.images.forEach((image) => {
			if (image.valid === undefined) {
				image.valid = true;
			}
		});
		this.character = character;
	}

	@mutation resetCharacter() {
		this.character = newCharacter(undefined);
	}

	@mutation changeCharacterName(name: string) {
		this.character.name = name;
	}

	@mutation changeCharacterOrigin(origin: string) {
		this.character.origin = origin;
	}

	@mutation addCharacterImage({ src, valid }: { src: string; valid: boolean }) {
		this.character.images.push(newCharacterImage(src, this.character.images.filter((image) => image.main).length === 0, valid));
	}

	@mutation designateImageAsInvalid(img: CharacterImage) {
		this.character.images.filter((image) => image === img)[0].valid = false;
	}

	@mutation removeCharacterImage(index: number) {
		if (this.character.images.length > 1 && this.character.images[index].main) {
			this.character.images.splice(index, 1);
			this.character.images[0].main = true;
		} else {
			this.character.images.splice(index, 1);
		}
	}

	@mutation designateMainImage(index: number) {
		this.character.images.forEach((image, i) => {
			image.main = i === index;
		});
	}
}
