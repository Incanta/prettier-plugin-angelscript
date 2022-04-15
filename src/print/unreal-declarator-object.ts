import { asCScriptNode, eScriptNode, eTokenType } from "angelscript-parser";
import { AstPath, doc, Doc, ParserOptions } from "prettier";
import { printOriginal } from "./token";

/* eslint-disable @typescript-eslint/no-unused-vars */
const {
  builders: {
    group,
    conditionalGroup,
    fill,
    ifBreak,
    breakParent,
    join,
    line,
    softline,
    hardline,
    literalline,
    lineSuffix,
    lineSuffixBoundary,
    indent,
    dedent,
    align,
    markAsRoot,
    dedentToRoot,
    trim,
    indentIfBreak,
    label,
    hardlineWithoutBreakParent,
    literallineWithoutBreakParent,
    cursor,
  },
} = doc;
/* eslint-enable @typescript-eslint/no-unused-vars */

export default function (
  path: AstPath<asCScriptNode>,
  options: ParserOptions<asCScriptNode>,
  printChild: (path: keyof asCScriptNode | Array<keyof asCScriptNode>) => Doc
): Doc {
  const node = path.getValue();

  const parts: Doc[] = [];
  const pathToChild: Array<keyof asCScriptNode> = [];

  let nextNode: asCScriptNode | null = node.firstChild;
  pathToChild.push("firstChild");

  while (nextNode !== null) {
    if (parts.length > 0) {
      parts.push([",", line]);
    }

    parts.push(printChild(pathToChild));

    if (
      nextNode.nodeType === eScriptNode.snIdentifier &&
      nextNode.firstChild?.tokenType === eTokenType.ttIdentifier &&
      nextNode.firstChild?.next?.nodeType === eScriptNode.snAssignment
    ) {
      // make sure to grab sub objects (i.e. the `meta` tag)
      parts.push(printChild([...pathToChild, "firstChild", "next"]));
    }

    nextNode = nextNode.next;
    pathToChild.push("next");
  }

  return parts;
}
