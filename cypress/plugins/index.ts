const cypressNuxt = require("cypress-nuxt");

module.exports = async (on, config) => {
	on("file:preprocessor", await filePreprocessor());
	return config;
};

function filePreprocessor() {
	require("ts-node").register({
		compilerOptions: {
			target: "es5",
			module: "commonjs",
		},
	});
	return cypressNuxt.plugin({});
}
