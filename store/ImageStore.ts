import { createModule, mutation } from "vuex-class-component";
import { CharacterImage, newCharacterImage } from "~/models/interfaces/Character";

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
});

export class ImageStore extends VuexModule.With({}) {
	// State
	image = newCharacterImage(undefined);

	// Mutations

	@mutation setImage(image: CharacterImage) {
		this.image = image;
	}
}
