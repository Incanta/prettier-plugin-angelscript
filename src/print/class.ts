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
  const classDeclarationNode = path.getValue();

  const pathToBody: Array<keyof asCScriptNode> = [];
  let nextBodyNode: asCScriptNode | null = null;
  const classParts: Doc[] = ["class"];
  const classNameNode = classDeclarationNode.firstChild;
  pathToBody.push("firstChild");
  nextBodyNode = classNameNode;
  if (classNameNode?.tokenType === eTokenType.ttIdentifier) {
    const className = printOriginal(classNameNode, options.originalText);
    if (className) {
      const beforeCurlyDeclaration: Doc[] = [];
      beforeCurlyDeclaration.push(" ", className);

      const heritageSymbol = Symbol("classHeritage");
      if (classNameNode.next?.nodeType === eScriptNode.snIdentifier) {
        const inheritedClassName = printOriginal(
          classNameNode.next,
          options.originalText
        );
        beforeCurlyDeclaration.push(
          " ",
          ":",
          group([line, inheritedClassName], { id: heritageSymbol })
        );
        pathToBody.push("next");
        nextBodyNode = nextBodyNode?.next || null;
      }

      const declarationParts: Doc[] = [];

      declarationParts.push(
        fill([
          indent([...beforeCurlyDeclaration]),
          ifBreak([dedent([hardline, "{"])], " {", { groupId: heritageSymbol }),
        ])
      );
      declarationParts.push(indent(hardline));

      classParts.push(declarationParts);

      const bodyParts: Doc[] = [];
      pathToBody.push("next");
      nextBodyNode = nextBodyNode?.next || null;
      while (nextBodyNode !== null) {
        bodyParts.push(printChild(pathToBody));
        nextBodyNode = nextBodyNode?.next || null;
        pathToBody.push("next");
        if (nextBodyNode !== null) {
          bodyParts.push(line);
        }
      }
      classParts.push(indent(bodyParts));

      classParts.push(dedent([hardline, "}"]));
    }
  }

  return classParts;
}
