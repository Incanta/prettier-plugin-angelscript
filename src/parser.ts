import { Parser, ParserOptions } from "prettier";
import {
  asCScriptNode,
  asCParser,
  asCTokenizer,
  asCScriptCode,
  eScriptNode,
} from "angelscript-parser";

class ParserWrapper {
  tokenizer: asCTokenizer;
  parser: asCParser;
  scriptText: string;
  code: asCScriptCode;

  constructor(scriptText: string) {
    this.tokenizer = new asCTokenizer();
    this.parser = new asCParser(this.tokenizer);
    this.code = new asCScriptCode();
    this.scriptText = scriptText;
    this.code.SetCode(scriptText);
  }

  parse(): asCScriptNode | null {
    this.parser.ParseScript(this.code);
    const node = this.parser.GetScriptNode();

    return node;
  }
}

function parse(
  text: string,
  parsers: { [parserName: string]: Parser },
  options: ParserOptions<asCScriptNode>
): asCScriptNode | null {
  const parser = new ParserWrapper(text);

  return parser.parse();
}

function locStart(node: asCScriptNode): number {
  node.nodeType;
  return node.tokenPos;
}

function locEnd(node: asCScriptNode): number {
  return node.tokenLength - 1;
}

export const parser: Parser = {
  parse,
  astFormat: "angelscript-ast",
  locStart,
  locEnd,
};
