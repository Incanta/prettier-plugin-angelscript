import { asCScriptNode, eTokenType } from "angelscript-parser";
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
  printChild: (path: keyof asCScriptNode) => Doc
): Doc | null {
  const classDeclarationNode = path.getValue();
  const parts: Doc[] = ["class"];

  const classNameNode = classDeclarationNode.firstChild;
  if (classNameNode?.tokenType === eTokenType.ttIdentifier) {
    const className = printOriginal(classNameNode, options.originalText);
    if (className) {
      parts.push(" ", className);

      if (classNameNode.next?.tokenType === eTokenType.ttIdentifier) {
        const inheritedClassName = printOriginal(
          classNameNode.next,
          options.originalText
        );
        parts.push(" ", ":", line, inheritedClassName);
      }
    }
  }

  return parts;

  return null;
}
