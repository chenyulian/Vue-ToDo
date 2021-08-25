const path = require("path");

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, "src/assets/icons");
    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(dir)
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ extract: false })
      .end();

    config
      .plugin("svg-sprite")
      .use(require("svg-sprite-loader/plugin"), [{ plainSprite: true }]);

    config.module.rule("svg").exclude.add(dir);
  },
  publicPath: process.env.NODE_ENV === "production" ? "/Vue-ToDo/" : "/",
};
