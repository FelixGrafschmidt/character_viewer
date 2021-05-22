import { createModule, Module, mutation } from "vuex-class-component";
import { CharacterImage, newCharacterImage } from "~/models/interfaces/Character";

const VuexModule = createModule({
	strict: false,
	target: "nuxt",
	namespaced: "ImageStore",
});

@Module()
export class ImageStore extends VuexModule {
	// State
	image = newCharacterImage(undefined);

	// Mutations

	@mutation setImage(image: CharacterImage) {
		this.image = image;
	}
}
