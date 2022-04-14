import { Plugin } from "prettier";
import { parser } from "./parser";
import { printer } from "./printer";

// https://github.com/ikatyang/linguist-languages/blob/master/data/AngelScript.json
export const languages: Plugin["languages"] = [
  {
    name: "AngelScript",
    vscodeLanguageIds: ["angelscript"],
    parsers: ["angelscript-parse"],
    extensions: [".as", ".angelscript"],
    tmScope: "scope.angelscript",
    aceMode: "text",
    codemirrorMode: "clike",
    codemirrorMimeType: "text/x-c++src",
    linguistLanguageId: 389477596,
  },
];

export const parsers: Plugin["parsers"] = {
  "angelscript-parse": parser,
};

export const printers: Plugin["printers"] = {
  "angelscript-ast": printer,
};
