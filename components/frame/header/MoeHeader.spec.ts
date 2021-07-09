import { createWrapper } from "@vue/test-utils";
import mountVue from "cypress-vue-unit-test";
import MoeHeader from "~/components/MoeHeader.vue";

describe("MoeHeader", () => {
	beforeEach(mountVue(MoeHeader));

	it("should initialize", () => {
		cy.wrap(Cypress.vue).should("not.be.undefined").get(".Triangle").should("have.length", 4);

		cy.wrap(createWrapper(Cypress.vue)).should((cmp) => cmp.isVueInstance());
	});
});
