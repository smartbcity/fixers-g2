// import path from "path"

module.exports = ({ config }) => {
  // Add SVGR Loader to load svg
  // ========================================================
  // Remove svg rules from existing webpack rule
  const assetRule = config.module.rules.find((rule) =>
    rule?.test?.test(".svg")
  );
  if (assetRule) {
    assetRule.exclude = /\.svg$/;
  }
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
    type: "javascript/auto",
  });
  // //unable to load react-leaflet optionnal chaining
  // config.module.rules.push({
  //   test: /\.(js|jsx)$/,
  //   loader: require.resolve("babel-loader"),
  //   options: {
  //     plugins: [
  //       "@babel/plugin-proposal-optional-chaining",
  //       "@babel/plugin-proposal-nullish-coalescing-operator",
  //     ],
  //   },
  //   include: [
  //     path.resolve(__dirname, "../node_modules/@react-leaflet"),
  //     path.resolve(__dirname, "../node_modules/react-leaflet"),
  //   ],
  // });
  return config;
};
