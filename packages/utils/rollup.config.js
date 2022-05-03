import getGlobal from "../../globalRollup.config";

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  ...getGlobal(packageJson),
};
