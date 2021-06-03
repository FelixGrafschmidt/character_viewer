import { v4 } from "uuid";
import { createModule, Module, mutation } from "vuex-class-component";
import { Character, CharacterAttribute, CharacterImage, newCharacter, newCharacterImage } from "~/models/interfaces/Character";

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
	namespaced: "CharacterStore",
});

@Module()
export class CharacterStore extends VuexModule {
	// State
	character = newCharacter("");
	activeImage = newCharacterImage(undefined);

	// Mutations
	@mutation setCharacter(character: Character) {
		character.images.forEach((image) => {
			if (image.valid === undefined) {
				image.valid = true;
			}
		});
		character.attributeArray.forEach((attribute) => {
			if (!attribute.id) {
				attribute.id = v4();
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
		if (this.character.images.filter((img) => img.src === src).length > 0) {
			return;
		}
		this.character.images.push(newCharacterImage(src, this.character.images.filter((image) => image.main).length === 0, valid));
	}

	@mutation designateImageAsInvalid(img: CharacterImage) {
		this.character.images.filter((image) => image === img)[0].valid = false;
	}

	@mutation addAttribute() {
		this.character.attributeArray.push({ name: "", value: "", id: v4() });
	}

	@mutation removeAttribute(attribute: CharacterAttribute) {
		this.character.attributeArray = this.character.attributeArray.filter((attr) => attr.id !== attribute.id);
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

	@mutation setActiveImage(image: CharacterImage) {
		this.activeImage = image;
	}

	@mutation nextImage() {
		const currentIndex = this.character.images.indexOf(this.activeImage);
		if (this.character.images.length - 1 > currentIndex) {
			this.activeImage = this.character.images[currentIndex + 1];
		} else {
			this.activeImage = this.character.images[0];
		}
	}

	@mutation previousImage() {
		const currentIndex = this.character.images.indexOf(this.activeImage);
		if (currentIndex > 0) {
			this.activeImage = this.character.images[currentIndex - 1];
		} else {
			this.activeImage = this.character.images[this.character.images.length - 1];
		}
	}
}
