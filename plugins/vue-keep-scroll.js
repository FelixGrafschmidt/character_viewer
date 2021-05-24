import Vue from "vue";

(function () {
	let vueKeepScroll;

	vueKeepScroll = undefined;

	const slice = [].slice;

	vueKeepScroll = {
		install(Vue) {
			return Vue.directive("keep-scroll", {
				bind(el, _binding, vnode) {
					let oldAttached;
					oldAttached = undefined;
					el.addEventListener("scroll", function (e) {
						let ele;
						ele = undefined;
						ele = e.target;
						return ele.setAttribute("data-vuescrlpos", ele.scrollLeft + "-" + ele.scrollTop);
					});
					oldAttached = vnode.context.activated;
					vnode.context.activated = function () {
						let args, ele, i, len, ref, ref1;
						args = undefined;
						ele = undefined;
						i = undefined;
						len = undefined;
						ref = undefined;
						ref1 = undefined;
						args = arguments.length >= 1 ? slice.call(arguments, 0) : [];
						ref = this.$el.querySelectorAll("[data-vuescrlpos]");
						if (ref.length > 0) {
							i = 0;
							len = ref.length;
							while (i < len) {
								ele = ref[i];
								ref1 = ele.getAttribute("data-vuescrlpos").split("-");
								ele.scrollLeft = ref1[0];
								ele.scrollTop = ref1[1];
								i++;
							}
						} else if (this.$el.hasAttribute("data-vuescrlpos")) {
							ref1 = this.$el.getAttribute("data-vuescrlpos").split("-");
							this.$el.scrollLeft = ref1[0];
							this.$el.scrollTop = ref1[1];
						}
						if (oldAttached !== undefined) {
							oldAttached.call.apply(oldAttached, [this].concat(slice.call(args)));
						}
					};
					vnode.context.$on("hook:activated", vnode.context.activated);
				},
			});
		},
	};

	if (Vue) {
		Vue.use(vueKeepScroll);
	}
}.call(this));
