import prettier from "prettier";
import fs from "fs";
import path from "path";
import * as plugin from "./plugin";

const asCode = fs.readFileSync(path.join(process.cwd(), "test.as"), {
  encoding: "utf-8",
});

const formattedCode = prettier.format(asCode, {
  parser: "angelscript-parse",
  plugins: [plugin],
});

fs.writeFileSync(path.join(process.cwd(), "out.as"), formattedCode, {
  encoding: "utf-8",
});
