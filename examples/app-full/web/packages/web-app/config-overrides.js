module.exports = (config) => {
  const tsRule = config.module.rules[1].oneOf[2];
  config.module.strictExportPresence = false;
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};
